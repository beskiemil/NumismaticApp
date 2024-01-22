import { Pressable, Text, View, StyleSheet } from "react-native";
import { BottomSheetSelect } from "../../../components/ui/BottomSheetSelect";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import { useMemo } from "react";

export const IssuerSelect = ({
  issuers,
  selectedIssuer,
  setSelectedIssuer,
}) => {
  const bottomSheetSnapPoints = useMemo(() => ["60%"], []);
  return (
    <>
      {issuers?.data.length > 0 && (
        <BottomSheetSelect
          bottomSheetSnapPoints={bottomSheetSnapPoints}
          options={issuers?.data.map((issuer) => {
            return {
              code: issuer.code,
              name: issuer.name,
              data: issuer.children,
            };
          })}
          optionLabel={"name"}
          optionValue={"code"}
          listKeyExtractor={(item) => item.code}
          selectedOption={selectedIssuer}
          onSelectOption={(item) => setSelectedIssuer(item)}
          placeholder={"Emitent"}
          isPaginated
          optionsOnPage={15}
          isSearchable
          textInputPlaceholder={"Wyszukaj emitenta..."}
          emptyListMessage={"Nie znaleziono emitentów"}
          renderItem={(
            item,
            sectionIdentifier,
            handleSelectItem,
            expandedSections,
          ) => (
            <ListItem
              item={item}
              sectionIdentifier={sectionIdentifier}
              handleSelectItem={handleSelectItem}
              expandedSections={expandedSections}
            />
          )}
          renderSectionHeader={(
            section,
            handleSelectItem,
            handleToggle,
            expandedSections,
          ) => (
            <SectionHeader
              section={section}
              handleSelectItem={handleSelectItem}
              handleToggle={handleToggle}
              expandedSections={expandedSections}
            />
          )}
          isSectionList
        />
      )}
    </>
  );
};

const ListItem = ({
  item,
  sectionIdentifier,
  handleSelectItem,
  expandedSections,
}) => {
  const isExpanded = expandedSections.find((i) => i === sectionIdentifier);
  if (!isExpanded) return null;
  return (
    <>
      <View style={styles.listItemContainer}>
        <Pressable onPress={() => handleSelectItem(item)}>
          <Text style={styles.listItemText}>{item.name}</Text>
        </Pressable>
      </View>
      {isExpanded && (
        <View
          style={{
            height: 1,
            width: "95%",
            backgroundColor: "grey",
            alignSelf: "center",
          }}
        />
      )}
      {item?.children?.length > 0 &&
        item?.children?.map((child) => (
          <ListItem
            item={child}
            sectionIdentifier={sectionIdentifier}
            handleSelectItem={handleSelectItem}
            expandedSections={expandedSections}
            key={child.code}
          />
        ))}
    </>
  );
};

const SectionHeader = ({
  section,
  handleSelectItem, //
  handleToggle,
  expandedSections,
}) => {
  const isExpanded = expandedSections.find((i) => i === section.code);
  return (
    <View style={styles.sectionHeader}>
      <Pressable onPress={() => handleSelectItem(section)}>
        <View style={styles.sectionHeaderTextContainer}>
          <Text style={styles.sectionHeaderText}>{section.name}</Text>
        </View>
      </Pressable>
      {section?.data?.length > 0 && (
        <Pressable onPress={() => handleToggle(section.code)}>
          <View style={styles.buttonContainer}>
            {!isExpanded && (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color={Colors.primary400}
              />
            )}
            {isExpanded && (
              <MaterialIcons
                name={"keyboard-arrow-up"}
                size={30}
                color={Colors.primary400}
              />
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    padding: 14,
    width: "100%",
  },
  listItemText: {
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: "100%",
    minHeight: 50,
  },
  sectionHeaderTextContainer: {
    flexDirection: "row",
    minWidth: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sectionHeaderText: {
    width: "auto",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    aspectRatio: 1,
  },
});

// <BottomSheetSelect
//   options={[
//     { name: "emitent 1", code: "emitent_1" },
//     { name: "emitent 2", code: "emitent_2" },
//     { name: "emitent 3", code: "emitent_3" },
//     { name: "issuer 1", code: "issuer_1" },
//     { name: "issuer 2", code: "issuer_2" },
//     { name: "issuer 3", code: "issuer_3" },
//   ]}
//   optionLabel={"name"}
//   optionValue={"code"}
//   selectedOption={selectedIssuer}
//   onSelectOption={(item) => setSelectedIssuer(item)}
//   isSearchable
//   textInputPlaceholder={"Wyszukaj emitenta..."}
//   listKeyExtractor={(item) => item.code}
//   listItemComponent={(item) => (
//     <Text>
//       {item.name} {item.code}
//     </Text>
//   )}
// />
