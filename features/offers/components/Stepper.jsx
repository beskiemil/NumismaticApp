import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../../components/PrimaryButton";
import Colors from "../../../constants/colors";

export const Stepper = ({ currentStep, steps, onBack, onNext, onFinish }) => {
  const renderProgressIndicators = () =>
    steps.map((step, index) => (
      <>
        <View
          key={step.title}
          style={[
            styles.stepIndicator,
            currentStep === index && styles.stepIndicatorActive,
          ]}
        >
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={[
              styles.stepIndicatorText,
              currentStep === index && styles.stepIndicatorTextActive,
            ]}
          >
            {index + 1}
          </Text>
        </View>
        {index < steps.length - 1 && <View style={styles.separator} />}
      </>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>{renderProgressIndicators()}</View>
      <View style={styles.titleContainer}>
        {steps[currentStep].title && (
          <Text style={styles.title}>{steps[currentStep].title}</Text>
        )}
      </View>
      <View style={styles.contentContainer}>{steps[currentStep].content}</View>
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <View style={styles.leftButton}>
            <PrimaryButton
              color={Colors.primary300}
              text={"Wróć"}
              onPress={onBack}
            />
          </View>
        )}
        {currentStep < steps.length - 1 && (
          <View style={styles.rightButton}>
            <PrimaryButton
              color={Colors.primary500}
              text={"Dalej"}
              onPress={onNext}
            />
          </View>
        )}
        {currentStep === steps.length - 1 && (
          <View style={styles.rightButton}>
            <PrimaryButton
              color={Colors.primary500}
              text={"Zatwierdź"}
              onPress={onFinish}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.primary500,
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
  },
  stepIndicator: {
    flex: 3,
    aspectRatio: 1,
    maxWidth: 45,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primary400,
    borderWidth: 3,
  },
  stepIndicatorActive: {
    borderColor: Colors.primary500,
    flex: 4,
    maxWidth: 60,
  },
  separator: {
    flex: 3,
    height: 3,
    marginHorizontal: 10,
    backgroundColor: Colors.primary400,
  },
  stepIndicatorText: {
    color: Colors.primary400,
    fontSize: 18,
    fontWeight: "bold",
  },
  stepIndicatorTextActive: {
    fontSize: 22,
    color: Colors.primary500,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  leftButton: {
    marginRight: "auto",
  },
  rightButton: {
    marginLeft: "auto",
  },
});
