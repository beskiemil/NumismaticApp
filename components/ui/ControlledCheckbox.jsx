import { Checkbox } from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";

export const ControlledCheckbox = ({
  control,
  name,
  rules,
  label,
  color,
  size,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.checkBoxContainer}>
          <Checkbox
            value={value}
            name={"agreement"}
            onValueChange={(value) => onChange(value)}
            color={color}
            style={{ width: size, aspectRatio: 1 }}
          />
          <Text style={{ fontSize: (size * 2) / 3 }}>{label}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
