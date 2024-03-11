import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";

export const ControlledSelect = ({
  name,
  control,
  options,
  rules,
  placeholder,
  color,
  arrowColor,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <RNPickerSelect
              value={value}
              onValueChange={(value) => onChange(value)}
              items={options ? [...options] : []}
              style={{
                ...pickerSelectStyles,
                inputAndroid: {
                  ...pickerSelectStyles.inputAndroid,
                  borderColor: color,
                  ...(error && { borderColor: Colors.danger500 }),
                },
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  borderColor: color,
                  ...(error && { borderColor: Colors.danger500 }),
                },
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={
                placeholder
                  ? { label: placeholder, value: null }
                  : { label: "Wybierz", value: null }
              }
              Icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={34}
                  color={(error && Colors.danger500) || arrowColor}
                />
              )}
            />
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
  },
  errorMessage: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 14,
    includeFontPadding: false,
    color: Colors.danger500,
  },
});

const pickerSelectStyles = StyleSheet.create({
  //TODO: FIX IOS STYLES

  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    width: 250,
    padding: 10,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: Colors.white,
    letterSpacing: 1,
    color: "black",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    width: 250,
    padding: 10,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: Colors.white,
    letterSpacing: 1,
    color: "black",
  },
  // eslint-disable-next-line react-native/no-unused-styles,react-native/no-color-literals
  placeholder: {
    fontSize: 18,
    letterSpacing: 1,
    color: "grey",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  iconContainer: {
    top: 0,
    right: 0,
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
