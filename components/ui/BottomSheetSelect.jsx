import { BottomSheetModal, BottomSheetSectionList } from "@gorhom/bottom-sheet";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Pressable, TextInput, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const pageReducer = (state, action) => {
  switch (action.type) {
    case "next":
      if (state.page === state.pageCount) return state;
      return { pageCount: state.pageCount, page: state.page + 1 };
    case "prev":
      if (state.page === 1) return state;
      return { pageCount: state.pageCount, page: state.page - 1 };
    case "start":
      return {
        pageCount: Math.ceil(action.optionsCount / action.itemsOnPage),
        page: 1,
      };
    default:
      return state;
  }
};

//needs to be rendered inside BottomSheetModalProvider
export const BottomSheetSelect = ({
  bottomSheetSnapPoints,
  options,
  optionLabel,
  optionValue,
  listKeyExtractor,
  selectedOption,
  onSelectOption,
  placeholder,
  isPaginated,
  optionsOnPage,
  isSearchable,
  emptyListMessage,
  textInputPlaceholder,
  renderItem,
  renderSectionHeader,
  color,
  isSectionList,
  isFlatList,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [expandedSections, setExpandedSections] = useState([]);
  const [pagination, changePage] = useReducer(pageReducer, {
    page: 1,
    pageCount: Math.ceil(filteredOptions?.length / optionsOnPage),
  });
  const [paginatedOptions, setPaginatedOptions] = useState(
    isPaginated ? filteredOptions.slice(0, optionsOnPage) : filteredOptions,
  );

  const listRef = useRef(null);

  useEffect(() => {
    if (isPaginated) {
      const first = (pagination.page - 1) * optionsOnPage;
      const last = pagination.page * optionsOnPage;
      setPaginatedOptions(filteredOptions.slice(first, last));
      listRef?.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
      });
    }
  }, [pagination, filteredOptions]);

  useEffect(() => {
    if (isPaginated) {
      changePage({
        type: "start",
        optionsCount: filteredOptions?.length,
        itemsOnPage: optionsOnPage,
      });
    }
  }, [filteredOptions]);

  const handleToggle = useCallback((item) => {
    setExpandedSections((prev) => {
      if (prev.includes(item)) {
        return prev.filter((a) => a !== item);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const onInputTextChange = (value) => {
    setSearchValue(value);
    if (value) {
      setFilteredOptions(
        options.filter(
          (option) =>
            option[optionLabel].toLowerCase().includes(value.toLowerCase()) ||
            option[optionValue].toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
    if (filteredOptions?.length > 0)
      listRef?.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
      });
  };

  const handleSelectItem = useCallback(
    (item) => {
      onSelectOption(item);
      bottomSheetModalRef.current?.dismiss();
    },
    [onSelectOption],
  );

  //modal handlers
  // ref
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);
  const handleSheetChanges = useCallback((index) => {}, []);

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={handlePresentModalPress}>
          <View style={styles.inputContainer}>
            <View style={styles.selectedOptionContainer}>
              {selectedOption && (
                <Text style={styles.selectedOptionText}>
                  {selectedOption[optionLabel]}
                </Text>
              )}
              {!selectedOption && (
                <Text style={styles.placeholderText}>
                  {placeholder || "Wybierz"}
                </Text>
              )}
            </View>

            <MaterialIcons
              name="keyboard-arrow-down"
              size={34}
              color={Colors.primary400}
            />
          </View>
        </Pressable>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={bottomSheetSnapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.modalContentContainer}>
          {isSearchable && (
            <TextInput
              placeholder={textInputPlaceholder || "Wyszukaj..."}
              value={searchValue}
              onChangeText={(value) => onInputTextChange(value)}
              style={styles.searchInput}
              cursorColor={color ? color : Colors.primary500}
              inputMode={"text"}
            />
          )}
          {isPaginated && (
            <View style={styles.paginationContainer}>
              {pagination.page > 1 && (
                <View style={{ marginRight: "auto" }}>
                  <Pressable onPress={() => changePage({ type: "prev" })}>
                    <View style={styles.paginationButtonContainer}>
                      <MaterialIcons
                        name="navigate-before"
                        size={30}
                        color="grey"
                      />
                    </View>
                  </Pressable>
                </View>
              )}
              {pagination.pageCount > 1 &&
                pagination.page < pagination.pageCount && (
                  <View style={{ marginLeft: "auto" }}>
                    <Pressable onPress={() => changePage({ type: "next" })}>
                      <View style={styles.paginationButtonContainer}>
                        <MaterialIcons
                          name="navigate-next"
                          size={30}
                          color="grey"
                        />
                      </View>
                    </Pressable>
                  </View>
                )}
            </View>
          )}
          {isFlatList && filteredOptions.length > 0 && (
            <FlatList
              ref={listRef}
              data={isPaginated ? paginatedOptions : filteredOptions}
              renderItem={({ item }) => renderItem(item, handleSelectItem)}
              keyExtractor={listKeyExtractor}
              contentContainerStyle={styles.listContentContainer}
            />
          )}
          {isSectionList && filteredOptions.length > 0 && (
            //section list options must have a "data" property
            <BottomSheetSectionList
              ref={listRef}
              sections={isPaginated ? paginatedOptions : filteredOptions}
              renderItem={({
                item,
                section: { [optionValue]: sectionIdentifier },
              }) =>
                renderItem(
                  item,
                  sectionIdentifier,
                  handleSelectItem,
                  expandedSections,
                )
              }
              keyExtractor={listKeyExtractor}
              contentContainerStyle={styles.listContentContainer}
              renderSectionHeader={({ section }) =>
                renderSectionHeader(
                  section,
                  handleSelectItem,
                  handleToggle,
                  expandedSections,
                )
              }
              extraData={expandedSections}
            />
          )}
          {(filteredOptions.length === 0 || !filteredOptions) && (
            <Text>{emptyListMessage || "Nie znaleziono"}</Text>
          )}
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchInput: {
    alignSelf: "center",
    width: 250,
    padding: 10,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.primary500,
    backgroundColor: Colors.white,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: 250,
    minHeight: 48,
    paddingVertical: 7,
    paddingHorizontal: 7,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.primary500,
    backgroundColor: Colors.white,
  },
  selectedOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 200,
  },
  paginationContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
  },
  paginationButtonContainer: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 6,
    aspectRatio: 1,
  },
  selectedOptionText: {
    fontSize: 18,
    letterSpacing: 1,
  },
  placeholderText: {
    fontSize: 18,
    letterSpacing: 1,
    color: "grey",
  },
  modalContentContainer: {
    width: "100%",
    flex: 1,
    gap: 10,
    marginVertical: 20,
  },
  listContentContainer: {
    width: "100%",
  },
});
