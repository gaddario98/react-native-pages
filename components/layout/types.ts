import { FormManagerConfig, Submit } from "@gaddario98/react-form";
import { ContentItem, ViewSettings } from "@gaddario98/react-pages";
import { QueriesArray } from "@gaddario98/react-queries";
import { FieldValues } from "react-hook-form";

export interface CustomScrollViewProps<
  F extends FieldValues,
  Q extends QueriesArray,
> {
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


export type DraggableViewItem = { id: string; element: React.JSX.Element; originalIndex: number };

export interface DraggableViewProps<F extends FieldValues, Q extends QueriesArray> {
  numColumns?: number;
  onReorder?: (props: { data: DraggableViewItem[]; from: number; to: number }) => void;
  viewSettings?: ViewSettings;
  allContents: (ContentItem<F, Q> | FormManagerConfig<F> | Submit<F>)[];
  body: React.JSX.Element[];
  handleRefresh?: () => Promise<void>;
  hasQueries: boolean;
  itemForPage?: number;
  onEndReached?: () => void;
}