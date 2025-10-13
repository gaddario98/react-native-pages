import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { RefreshControl, View } from "react-native";
import { withMemo } from "@gaddario98/utiles";
import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { padding } from "@gaddario98/react-native-ui";
import { CustomScrollViewProps } from "../types";
import { FlashList, useMappingHelper } from "@shopify/flash-list";

const RenderItem = ({
  item,
  index,
}: {
  item: React.JSX.Element;
  index: number;
}) => {
  const { getMappingKey } = useMappingHelper();
  return (
    <View
      style={{
        padding: 5,
        flex: 1,
      }}
      key={getMappingKey(item.key ?? "", index)}
    >
      {item}
    </View>
  );
};
const ShopifyView = withMemo(
  <F extends FieldValues, Q extends QueriesArray>({
    allContents,
    handleRefresh,
    hasQueries,
    body = [],
    itemForPage,
    onEndReached: baseOnEndReached,
    type,
    withoutPadding,
    disableRefreshing,
    numColumns = 1,
  }: CustomScrollViewProps<F, Q>) => {
    const [refreshing, setRefreshing] = useState(false);
    const onLoadRef = useRef<boolean>(false);
    const [numItems, setNumItems] = useState<number>(
      itemForPage ?? body?.length ?? 1
    );

    const visibleItems = useMemo(
      () => body?.slice(0, numItems) ?? [],
      [body, numItems]
    );

    useEffect(() => {
      const tmp = itemForPage || body?.length || 1;
      if (numItems < tmp) setNumItems(tmp);
    }, [body?.length, itemForPage, numItems]);

    const onEndReached = useCallback(async () => {
      onLoadRef.current = false;
      setTimeout(() => {
        onLoadRef.current = true;
      }, 500);
      if (baseOnEndReached) {
        baseOnEndReached();
      }
      if (!itemForPage || !body || visibleItems.length >= body.length) {
        return;
      }
      setNumItems(visibleItems.length + itemForPage);
    }, [baseOnEndReached, itemForPage, body, visibleItems.length]);

    const handleQueryRefresh = useCallback(async () => {
      if (!disableRefreshing && handleRefresh) {
        setRefreshing(true);
        try {
          handleRefresh();
        } finally {
          setRefreshing(false);
        }
      }
    }, [handleRefresh, disableRefreshing]);

    const refreshControl = useMemo(
      () =>
        hasQueries && !disableRefreshing ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleQueryRefresh}
          />
        ) : undefined,
      [handleQueryRefresh, hasQueries, refreshing, disableRefreshing]
    );
    return (
      <FlashList<React.JSX.Element>
        id="shopify-view"
        data={visibleItems}
        numColumns={numColumns ?? 1}
        masonry={type === "mansoryLayout"}
        renderItem={(props) => <RenderItem {...props} />}
        refreshControl={refreshControl}
        contentContainerStyle={
          {
               padding: withoutPadding ? 0 : padding - 5,
          }
        }
        keyExtractor={(item, i) => item.key ?? i.toString()}
        onEndReached={() => {
          //console.log("onEndReached",onLoadRef.current);
          if (onLoadRef.current) {
            onEndReached();
          }
        }}
        overrideItemLayout={(layout, item) => {
          layout.span =
            allContents?.find((el, i) => (el?.key ?? i) === item.key)
              ?.usedBoxes ?? 1;
        }}
        //   automaticallyAdjustKeyboardInsets
        // onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        //automaticallyAdjustsScrollIndicatorInsets
        onLayout={(e) => {
          onLoadRef.current = !!e?.nativeEvent?.layout?.height;
          //console.log("onLayout",onLoadRef.current);
        }}
      />
    );
  }
);
export default ShopifyView;
