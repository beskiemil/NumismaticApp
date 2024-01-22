import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";

export const ControlledSelect = ({
  name,
  control,
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
          <RNPickerSelect
            onValueChange={(value) => onChange(value)}
            items={[
              { label: "Moneta", value: "coin" },
              { label: "Banknot", value: "banknote" },
              { label: "Egzonumia", value: "exonumia" },
            ]}
            style={{
              ...pickerSelectStyles,
              inputAndroid: {
                ...pickerSelectStyles.inputAndroid,
                borderColor: color,
              },
            }}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Wybierz kategorię", value: null }}
            Icon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={34}
                color={arrowColor}
              />
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    alignSelf: "flex-start",
  },
});

const pickerSelectStyles = StyleSheet.create({
  //TODO: FIX IOS STYLES

  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 18,
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
  },
  placeholder: {
    fontSize: 18,
    letterSpacing: 1,
    color: "grey",
  },
  iconContainer: {
    top: 9,
    right: 8,
  },
});
