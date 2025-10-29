import { useMemo, useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { withMemo } from "@gaddario98/utiles";
import { FieldValues } from "react-hook-form";
import { padding, pageLayout } from "@gaddario98/react-native-ui";
import { QueriesArray } from "@gaddario98/react-queries";
import { FormManagerConfig, Submit } from "@gaddario98/react-form";
import { ContentItem, ViewSettings } from "@gaddario98/react-pages";

export interface CustomScrollViewProps<
  F extends FieldValues,
  Q extends QueriesArray,
> {
  viewSettings?: ViewSettings;
  allContents: (ContentItem<F, Q> | FormManagerConfig<F> | Submit<F>)[];
  children: React.JSX.Element[];
  handleRefresh?: () => Promise<void>;
  hasQueries: boolean;
}

const DefaultView = withMemo(
  <F extends FieldValues, Q extends QueriesArray>({
    viewSettings,
    handleRefresh,
    hasQueries,
    children,
  }: CustomScrollViewProps<F, Q>) => {
    const [refreshing, setRefreshing] = useState(false);

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

    return (
      <ScrollView
        contentContainerStyle={[pageLayout, { padding: padding }]}
        refreshControl={refreshControl}
        id="default-view"
      >
        {children}
      </ScrollView>
    );
  }
);
export default DefaultView;
