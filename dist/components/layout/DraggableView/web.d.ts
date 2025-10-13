import { FieldValues } from "react-hook-form";
import { QueriesArray } from "@gaddario98/react-queries";
import { DraggableViewProps } from "../types";
declare const DraggableView: <F extends FieldValues, Q extends QueriesArray>({ body, onReorder, viewSettings, allContents, onEndReached, itemForPage, }: DraggableViewProps<F, Q>) => import("react/jsx-runtime").JSX.Element;
export default DraggableView;
