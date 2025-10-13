import { padding } from "@gaddario98/react-native-ui";
import { QueriesArray } from "@gaddario98/react-queries";
import { withMemo } from "@gaddario98/utiles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { DraggableViewItem, DraggableViewProps } from "../types";

const DraggableView = withMemo(
  <F extends FieldValues, Q extends QueriesArray>({
    numColumns,
    body = [],
    onReorder,
    viewSettings,
    allContents,
    handleRefresh,
    onEndReached,
    hasQueries,
    itemForPage,
    ...props
  }: DraggableViewProps<F, Q>) => {
    const [refreshing, setRefreshing] = useState(false);
    const [onEnd, setOnEnd] = useState<boolean>(true);
    const [numItems, setNumItems] = useState<number>(
      itemForPage ?? body?.length ?? 1
    );

    const visibleItems = useMemo(
      () => body?.slice(0, numItems) ?? [],
      [body, numItems]
    );

    const [items, setItems] = useState<DraggableViewItem[]>([]);

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
      (props: DragEndParams<DraggableViewItem>) => {
        setItems?.(props.data);
        onReorder?.({
          ...props,
          data:
            props?.data?.filter((item) => {
              const itemDetail = allBodyContent?.find(
                (el, i) => `${el.key || i}` === item.id
              );
              return (
                !!itemDetail?.isInDraggableView || !!itemDetail?.isDraggable
              );
            }) ?? [],
        });
      },
      [onReorder]
    );
    const allBodyContent = useMemo(
      () =>
        allContents?.filter((el) => !el.renderInFooter && !el.renderInHeader),
      [allContents]
    );

    const renderDraggableItem = useCallback(
      ({ item, drag, isActive }: RenderItemParams<DraggableViewItem>) => {
        const itemDetail = allBodyContent?.find(
          (el, i) => `${el.key || i}` === item.id
        );

        const isItemDraggable = itemDetail?.isDraggable ?? false;

        if (!itemDetail?.isInDraggableView && !isItemDraggable) {
          return item.element;
        }

        return (
          <ScaleDecorator activeScale={1}>
            <TouchableOpacity
              style={{ padding: 5, flex: 1, opacity: isActive ? 0.5 : 1 }}
              onLongPress={isItemDraggable ? drag : undefined}
              disabled={isActive}
              activeOpacity={1}
            >
              {item.element}
            </TouchableOpacity>
          </ScaleDecorator>
        );
      },
      [allBodyContent]
    );

    const handleQueryRefresh = useCallback(async () => {
      if (!viewSettings?.disableRefreshing && handleRefresh) {
        setRefreshing(true);
        try {
          handleRefresh();
        } finally {
          setRefreshing(false);
        }
      }
    }, [handleRefresh, viewSettings?.disableRefreshing]);

    const refreshControl = useMemo(
      () =>
        hasQueries && !viewSettings?.disableRefreshing ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleQueryRefresh}
          />
        ) : undefined,
      [
        handleQueryRefresh,
        hasQueries,
        refreshing,
        viewSettings?.disableRefreshing,
      ]
    );
    const onEndReachedHandle = useCallback(async () => {
      if (onEndReached) {
        onEndReached();
      }
      if (!itemForPage || !body || visibleItems.length >= body.length) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const newLength = visibleItems.length + itemForPage;
      const maxLength = body?.length ?? 0;
      const tmp = maxLength < newLength ? maxLength : newLength;
      setNumItems(tmp);
    }, [viewSettings, body, visibleItems.length]);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableFlatList<DraggableViewItem>
          {...props}
          data={items}
          numColumns={numColumns ?? 1}
          onEndReachedThreshold={0.3}
          onDragEnd={handleDragEnd}
          contentContainerStyle={{
            padding: viewSettings?.withoutPadding ? 0 : padding - 5,
          }}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          renderItem={renderDraggableItem}
          refreshControl={refreshControl}
          onMomentumScrollBegin={() => setOnEnd(false)}
          onEndReached={() => {
            if (!onEnd) {
              onEndReachedHandle();
            }
          }}
        />
      </GestureHandlerRootView>
    );
  }
);

export default DraggableView;
