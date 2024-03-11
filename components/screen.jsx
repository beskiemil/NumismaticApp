import { ScrollView, StyleSheet, View } from "react-native";

export const ScrollScreen = ({ children, contentContainerStyle, style }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      style={style}
    >
      {children}
    </ScrollView>
  );
};

export const Screen = ({ children, style }) => {
  return <View style={[styles.contentContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    flexGrow: 1,
    gap: 20,
  },
});
