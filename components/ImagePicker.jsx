import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Colors from "../constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

export const ImagePicker = ({
  placeholder,
  name,
  control,
  rules,
  containerStyles,
}) => {
  const [cameraStatus, requestCameraPermission] = useCameraPermissions();
  const verifyPermissions = async () => {
    console.log(cameraStatus);
    if (
      cameraStatus.status === PermissionStatus.UNDETERMINED ||
      (cameraStatus.status === PermissionStatus.DENIED &&
        cameraStatus.canAskAgain)
    ) {
      const result = await requestCameraPermission();
      if (result.status === PermissionStatus.GRANTED) return true;
    }
    if (cameraStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Brak uprawnień",
        "Aplikacja potrzebuje uprawnień do aparatu, aby wykonać zdjęcie. Możesz je zmienić w ustawieniach aplikacji.",
        [{ text: "OK" }],
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return null;
    }
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) return result.assets[0];
  };

  const onButtonPress = async (onChange) => {
    const result = await takeImage();
    if (result) onChange(result);
  };

  // noinspection JSValidateTypes
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.imagePreviewContainer,
              containerStyles,
              error && { borderColor: Colors.danger500 },
            ]}
          >
            {!value && (
              <Pressable onPress={() => onButtonPress(onChange)}>
                <View style={styles.addButtonContainer}>
                  <Text
                    style={[
                      styles.description,
                      // eslint-disable-next-line react-native/no-inline-styles
                      error && { color: Colors.danger500, opacity: 0.5 },
                    ]}
                  >
                    {placeholder}
                  </Text>
                  <Ionicons
                    name={"add"}
                    size={50}
                    color={(error && Colors.danger400) || Colors.primary300}
                  />
                </View>
              </Pressable>
            )}
            {value && (
              <View>
                <Image
                  source={{ uri: value.uri }}
                  style={styles.imagePreview}
                />
                <View style={styles.deleteButtonContainer}>
                  <Pressable onPress={() => onChange(null)}>
                    <Feather name="x" size={24} color={Colors.danger600} />
                  </Pressable>
                </View>
              </View>
            )}
          </View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary500,
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  addButtonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // eslint-disable-next-line react-native/no-color-literals
  deleteButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 5,
    padding: 5,
  },
  description: {
    position: "absolute",
    top: "15%",
    fontSize: 24,
    color: Colors.primary300,
    letterSpacing: 2,
  },
  imagePreview: {
    height: "100%",
    width: "100%",
    aspectRatio: 1,
  },
  errorMessage: {
    textAlign: "right",
    marginRight: 5,
    fontSize: 14,
    includeFontPadding: false,
    color: Colors.danger500,
  },
});
