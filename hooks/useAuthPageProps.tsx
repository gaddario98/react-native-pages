import { useMemo } from "react";
import { pageConfig, PageProps } from "@gaddario98/react-pages";
import { Button, Image, Paragraph } from "@gaddario98/react-native-ui";

export interface UseAuthPageProps {
  image?: React.ComponentProps<typeof Image>;
  controlText?: React.ComponentProps<typeof Paragraph>;
  login?: React.ComponentProps<typeof Button>;
  signup?: React.ComponentProps<typeof Button>;
  reportProblem?: React.ComponentProps<typeof Button>;
}

export const useAuthPageProps = (props: UseAuthPageProps): PageProps => {
  const authPageProps = useMemo(
    (): PageProps => ({
      ns: "auth",
      id: "auth",
      contents: [
        {
          type: "custom",
          component: (
            <Image
              {...props?.image}
              fallbackSource={
                props.image?.fallbackSource ?? pageConfig.authPageImage
              }
              source={props.image?.source ?? pageConfig.authPageImage}
              resizeMode={props.image?.resizeMode ?? "contain"}
              contentPosition="center"
              style={
                props.image?.style ?? { width: "auto", flex: 1, margin: 0 }
              }
            />
          ),
          hidden: !props.image?.source && !pageConfig.authPageImage,
        },
        {
          type: "custom",
          component: (
            <Paragraph
              {...props.controlText}
              description={
                typeof props.controlText?.description !== "string"
                  ? {
                      ...props.controlText?.description,
                      text:
                        props.controlText?.description?.text ?? "controlText",

                      style: [
                        { textAlign: "center" },
                        props.controlText?.description?.style ?? {},
                      ],
                    }
                  : (props.controlText?.description ?? "controlText")
              }
            />
          ),
          renderInFooter: true,
        },
        {
          type: "custom",
          component: (
            <Button
              {...props.login}
              text={props.login?.text ?? "login"}
              ns={props.login?.ns ?? "auth"}
              variant={props.login?.variant ?? "contained"}
            />
          ),
          renderInFooter: true,
        },
        {
          type: "custom",
          component: (
            <Button
              {...props.signup}
              text={props.signup?.text ?? "createAccount"}
              ns={props.signup?.ns ?? "auth"}
              variant={props.signup?.variant ?? "outlined"}
              color={props.signup?.color ?? "secondary"}
            />
          ),
          renderInFooter: true,
        },
        {
          type: "custom",
          component: (
            <Button
              {...props.reportProblem}
              text={props.reportProblem?.text ?? "reportProblem"}
              ns={props.reportProblem?.ns ?? "buttons"}
              variant={props.reportProblem?.variant ?? "text"}
              color={props.reportProblem?.color ?? "error"}
            />
          ),
          renderInFooter: true,
        },
      ],
    }),
    [props]
  );

  return authPageProps;
};
