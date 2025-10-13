import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { FormManagerConfig, Submit } from "@gaddario98/react-form";
import { ContentItem, ViewSettings } from "@gaddario98/react-pages";
export interface CustomScrollViewProps<F extends FieldValues, Q extends QueriesArray> {
    viewSettings?: ViewSettings;
    allContents: (ContentItem<F, Q> | FormManagerConfig<F> | Submit<F>)[];
    body: React.JSX.Element[];
    handleRefresh?: () => Promise<void>;
    hasQueries: boolean;
    itemForPage?: number;
    onEndReached?: () => void;
    withoutPadding?: boolean;
    type: "flashlist" | "mansoryLayout";
    disableRefreshing?: boolean;
    numColumns?: number;
}
declare const ShopifyView: <F extends FieldValues, Q extends QueriesArray>({ allContents, handleRefresh, hasQueries, body, itemForPage, onEndReached: baseOnEndReached, type, withoutPadding, disableRefreshing, numColumns, }: CustomScrollViewProps<F, Q>) => import("react/jsx-runtime").JSX.Element;
export default ShopifyView;
