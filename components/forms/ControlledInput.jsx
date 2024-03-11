import { Controller } from "react-hook-form";
import { Input } from "./Input";

const ControlledInput = ({
  name,
  control,
  rules,
  label,
  placeholder,
  color,
  inputMode,
  secureTextEntry,
  autoComplete,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          color={color}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
          autoComplete={autoComplete}
        />
        // <View
        //   style={[
        //     styles.container,
        //     error ? styles.containerError : null,
        //     label ? styles.containerLabel : null,
        //     { color: color ? color : Colors.primary500 },
        //   ]}
        // >
        //   {label && <Text style={styles.label}>{label}</Text>}
        //   <TextInput
        //     placeholder={placeholder}
        //     value={value}
        //     onChangeText={(value) => onChange(value)}
        //     style={[
        //       styles.input,
        //       {
        //         borderColor: error
        //           ? Colors.danger500
        //           : color
        //           ? color
        //           : Colors.primary500,
        //       },
        //     ]}
        //     cursorColor={color ? color : Colors.primary500}
        //     inputMode={inputMode}
        //     secureTextEntry={secureTextEntry}
        //     autoComplete={autoComplete}
        //   />
        //   {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        // </View>
      )}
    />
  );
};

export default ControlledInput;
