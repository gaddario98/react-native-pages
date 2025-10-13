import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { CustomScrollViewProps } from "../types";
declare const ShopifyView: <F extends FieldValues, Q extends QueriesArray>({ allContents, handleRefresh, hasQueries, body, itemForPage, onEndReached: baseOnEndReached, type, withoutPadding, disableRefreshing, numColumns, }: CustomScrollViewProps<F, Q>) => import("react/jsx-runtime").JSX.Element;
export default ShopifyView;
