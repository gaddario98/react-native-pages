import { setPageConfig, PageConfigProps } from "@gaddario98/react-pages";
import Element from "./components/Element";
import { View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, contentLayout, padding } from "@gaddario98/react-native-ui";
import { DefaultView } from "./components/layout";
import React from "react";

export const setReactNativePageConfig = (config: Partial<PageConfigProps>) => {
  setPageConfig({
    FooterContainer: ({ children, withoutPadding, ...props }) => (
      <Element
        {...props}
        withoutPadding={withoutPadding}
        style={{
          paddingHorizontal: withoutPadding ? 0 : padding,
          paddingBottom: withoutPadding ? 0 : padding,
        }}
      >
        {children ?? []}
      </Element>
    ),
    HeaderContainer: ({ children, withoutPadding, ...props }) => (
      <Element
        {...props}
        withoutPadding={withoutPadding}
        style={{
          paddingHorizontal: withoutPadding ? 0 : padding,
          paddingTop: withoutPadding ? 0 : padding,
        }}
      >
        {children ?? []}
      </Element>
    ),
    ItemsContainer: ({ children }) => (
      <View
        style={[
          contentLayout,
          {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
          },
        ]}
      >
        {children}
      </View>
    ),
    BodyContainer: ({ children, ...props }) => (
      <DefaultView {...props}>{children ?? []}</DefaultView>
    ),
    LoaderComponent: ({ loading, message, ns }) =>
      loading && (
        <Alert
          message={message ?? "Caricamento in corso..."}
          ns={ns}
          style={{
            position: "relative",
            top: 0,
            marginHorizontal: padding,
            marginTop: padding,
            zIndex: 1000,
            left: 0,
            right: 0,
          }}
          type="info"
          textProps={{ loading: true }}
        />
      ),
    PageContainer: ({ children, id }) => (
      <SafeAreaView style={{ flex: 1 }} id={id} key={id}>
        
        {children as React.JSX.Element}
      </SafeAreaView>
    ),
    ...config,
  });
};
