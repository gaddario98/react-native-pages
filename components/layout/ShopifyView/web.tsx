import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { gap, padding } from "@gaddario98/react-native-ui";
import { withMemo } from "@gaddario98/utiles";
import { CustomScrollViewProps } from "../types";

// to do -> implementare la possibilità di dividere per colonne e Masonry layout -> https://tanstack.com/virtual/latest/docs/framework/react/examples/variable
const ShopifyView = withMemo(
  <F extends FieldValues, Q extends QueriesArray>({
    withoutPadding,
    body = [],
    itemForPage,
    onEndReached: baseOnEndReached,
    numColumns = 1,
  }: CustomScrollViewProps<F, Q>) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [numItems, setNumItems] = useState<number>(
      itemForPage ?? body?.length ?? 1
    );

    const visibleItems = useMemo(
      () => body?.slice(0, numItems) ?? [],
      [body, numItems]
    );

    useEffect(() => {
      setNumItems(itemForPage ?? body?.length ?? 1);
    }, [body?.length, itemForPage]);

    const onEndReached = useCallback(async () => {
      if (baseOnEndReached) {
        baseOnEndReached();
      }

      if (!itemForPage || !body || visibleItems.length >= body.length) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const newLength = visibleItems.length + itemForPage;
      const maxLength = body?.length ?? 0;
      const tmp = maxLength < newLength ? maxLength : newLength;
      setNumItems(tmp);
    }, [baseOnEndReached, itemForPage, body, visibleItems.length]);

    // Gestione dello scroll infinito
    const handleScroll = useCallback(() => {
      if (!parentRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        onEndReached();
      }
    }, [onEndReached]);

    // Stili per il layout masonry
    /*const getMasonryStyles = useCallback(
    (index: number) => {
      if (viewSettings?.type !== 'mansoryLayout') return {};

      const span =
        allContents?.find(
          (el, i) => (el?.key ?? i) === visibleItems[index]?.key,
        )?.usedBoxes ?? 1;

      return {
        gridRowEnd: `span ${span}`,
      };
    },
    [allContents, visibleItems, viewSettings?.type],
  );*/

    const virtualizer = useVirtualizer({
      count: visibleItems.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 50, // Questa è solo una stima iniziale
      overscan: 5,
      lanes: numColumns,
      gap: gap,
      measureElement: (element) => {
        if (!element) return 50;
        return element.getBoundingClientRect().height;
      },
    });

    return (
      <div
        ref={parentRef}
        onScroll={handleScroll}
        style={{
          height: "100%",
          overflow: "auto",
          padding: withoutPadding ? 0 : padding,
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = visibleItems[virtualRow.index];
            /* const span =
              allContents?.find((el, i) => (el?.key ?? i) === item.key)
                ?.usedBoxes ?? 1;*/
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `calc((100% - ${gap * (numColumns - 1)}px) / ${numColumns} * ${virtualRow.lane} + ${virtualRow.lane * gap}px)`,
                  width: `calc((100% - ${gap * (numColumns - 1)}px) / ${numColumns})`,
                  height: `auto`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ShopifyView;
