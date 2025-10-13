import { PageProps } from "@gaddario98/react-pages";
import { Button, Image, Paragraph } from "@gaddario98/react-native-ui";
export interface UseAuthPageProps {
    image?: React.ComponentProps<typeof Image>;
    controlText?: React.ComponentProps<typeof Paragraph>;
    login?: React.ComponentProps<typeof Button>;
    signup?: React.ComponentProps<typeof Button>;
    reportProblem?: React.ComponentProps<typeof Button>;
}
export declare const useAuthPageProps: (props: UseAuthPageProps) => PageProps<import("react-hook-form").FieldValues, import("@gaddario98/react-queries").QueriesArray>;
