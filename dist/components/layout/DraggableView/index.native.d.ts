import { QueriesArray } from "@gaddario98/react-queries";
import { FieldValues } from "react-hook-form";
import { DraggableViewProps } from "../types";
declare const DraggableView: <F extends FieldValues, Q extends QueriesArray>({ numColumns, body, onReorder, viewSettings, allContents, handleRefresh, onEndReached, hasQueries, itemForPage, ...props }: DraggableViewProps<F, Q>) => import("react/jsx-runtime").JSX.Element;
export default DraggableView;
