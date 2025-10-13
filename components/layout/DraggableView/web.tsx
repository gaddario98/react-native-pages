import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { padding } from "@gaddario98/react-native-ui";
import { DraggableViewItem, DraggableViewProps } from "../types";

const SortableItem: React.FC<{
  item: DraggableViewItem;
  isDraggable?: boolean;
}> = ({ item, isDraggable }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled: !isDraggable });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 5,
        cursor: isDraggable ? "grab" : "default",
      }}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
    >
      {item.element}
    </div>
  );
};

const DraggableView = <F extends FieldValues, Q extends QueriesArray>({
  body = [],
  onReorder,
  viewSettings,
  allContents,
  onEndReached,
  itemForPage,
}: DraggableViewProps<F, Q>) => {
  const [onEnd, setOnEnd] = useState<boolean>(true);
  const [numItems, setNumItems] = useState<number>(
    itemForPage ?? body?.length ?? 1
  );
  const [items, setItems] = useState<DraggableViewItem[]>([]);

  const visibleItems = useMemo(
    () => body?.slice(0, numItems) ?? [],
    [body, numItems]
  );

  useEffect(() => {
    const newItems = visibleItems.map((el, i) => ({
      id: `${el.key || i}`,
      element: el,
      originalIndex: i,
    }));
    setItems(newItems);
  }, [visibleItems]);

  useEffect(() => {
    setNumItems(itemForPage ?? body?.length ?? 1);
  }, [body?.length, itemForPage]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);
        onReorder?.({
          data:
            newItems?.filter((item) => {
              const itemDetail = allBodyContent?.find(
                (el, i) => `${el.key || i}` === item.id
              );
              return (
                !!itemDetail?.isInDraggableView || !!itemDetail?.isDraggable
              );
            }) ?? [],
          from: oldIndex,
          to: newIndex,
        });
      }
    },
    [items, onReorder]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;

      if (isNearBottom && !onEnd) {
        setOnEnd(true);
        if (onEndReached) {
          onEndReached();
        }
        if (!itemForPage || !body || visibleItems.length >= body.length) {
          return;
        }

        setTimeout(() => {
          const newLength = visibleItems.length + itemForPage;
          const maxLength = body?.length ?? 0;
          const tmp = maxLength < newLength ? maxLength : newLength;
          setNumItems(tmp);
        }, 500);
      }
    },
    [onEnd, onEndReached, itemForPage, body, visibleItems.length]
  );

  const allBodyContent = useMemo(
    () => allContents?.filter((el) => !el.renderInFooter && !el.renderInHeader),
    [allContents]
  );

  return (
    <div
      style={{
        flex: 1,
        overflowY: "scroll",
        padding: viewSettings?.withoutPadding ? 0 : padding - 5,
      }}
      onScroll={handleScroll}
      onMouseDown={() => setOnEnd(false)}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            const itemDetail = allBodyContent?.find(
              (el, i) => `${el.key || i}` === item.id
            );

            const isItemDraggable = itemDetail?.isDraggable ?? false;

            if (!itemDetail?.isInDraggableView && !isItemDraggable) {
              return item.element;
            }

            return (
              <SortableItem
                key={item.id}
                item={item}
                isDraggable={isItemDraggable}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableView;
