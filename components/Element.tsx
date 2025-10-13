import { contentLayout, padding } from "@gaddario98/react-native-ui";
import { ViewSettings } from "@gaddario98/react-pages";
import { memo } from "react";
import { View, ViewStyle } from "react-native";

const Element = ({
  style,
  children
}: {
  style?: ViewStyle;
  children: React.JSX.Element[];
} & (ViewSettings["header"] | ViewSettings["footer"])) => {
  if (!children?.length) return null;

  return (
    <View
      style={[
        contentLayout,
        {  height: "auto" },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default memo(Element);
