import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { FormManagerConfig, Submit } from "@gaddario98/react-form";
import { ContentItem, ViewSettings } from "@gaddario98/react-pages";
interface CustomScrollViewProps<F extends FieldValues, Q extends QueriesArray> {
    viewSettings?: ViewSettings;
    allContents: (ContentItem<F, Q> | FormManagerConfig<F> | Submit<F>)[];
    children: React.JSX.Element[];
    handleRefresh?: () => Promise<void>;
    hasQueries: boolean;
}
declare const DefaultView: <F extends FieldValues, Q extends QueriesArray>({ viewSettings, handleRefresh, hasQueries, children, }: CustomScrollViewProps<F, Q>) => import("react/jsx-runtime").JSX.Element;
export default DefaultView;
