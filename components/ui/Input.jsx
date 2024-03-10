import Colors from "../../constants/colors";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const Input = ({
  placeholder,
  value,
  onChange,
  inputMode,
  secureTextEntry,
  autoComplete,
  color,
  error,
  label,
}) => {
  return (
    <View
      style={[
        styles.container,
        error && styles.containerError,
        label && styles.containerLabel,
        { color: color ? color : Colors.primary500 },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(value) => onChange(value)}
        style={[
          styles.input,
          {
            borderColor: error
              ? Colors.danger500
              : color
              ? color
              : Colors.primary500,
          },
        ]}
        cursorColor={color ? color : Colors.primary500}
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
      />
      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 250,
    paddingVertical: 20,
  },
  containerError: {
    paddingBottom: 2,
  },
  containerLabel: {
    paddingTop: 0,
  },
  label: {
    marginLeft: 5,
    fontSize: 18,
    includeFontPadding: false,
    letterSpacing: 1,
  },
  input: {
    width: 250,
    padding: 10,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: Colors.white,
    letterSpacing: 1,
  },
  errorMessage: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 14,
    includeFontPadding: false,
    color: Colors.danger500,
  },
});
