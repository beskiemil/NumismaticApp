import { StyleSheet, TextInput, View, Text } from "react-native";
import Colors from "../constants/colors";

const SimpleTextInput = ({
  placeholder,
  onChangeText,
  color,
  label,
  error,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          error ? styles.containerError : null,
          label ? styles.containerLabel : null,
          { color: color ? color : Colors.primary500 },
        ]}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={[
            styles.input,
            error ? styles.inputError : null,
            { borderColor: color ? color : Colors.primary500 },
          ]}
          cursorColor={color}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
  inputError: {
    borderColor: Colors.warning400,
  },
  errorMessage: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 14,
    includeFontPadding: false,
    color: Colors.warning400,
  },
});

export default SimpleTextInput;
