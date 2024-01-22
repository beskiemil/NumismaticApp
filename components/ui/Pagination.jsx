import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const pageNumbers = Array.from(
    { length: pageCount },
    (el, index) => index + 1,
  );
  const [pageBound, setPageBound] = useState({
    lower: 1,
    upper: 3,
  });

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      if (page < 1) {
        onPageChange(1);
        setPageBound({
          lower: 1,
          upper: 3,
        });
        return;
      }
      if (page > pageCount) {
        onPageChange(pageCount);
        setPageBound({
          lower: pageCount - 2,
          upper: pageCount,
        });
        return;
      }

      onPageChange(page);
      if (page <= 2) {
        setPageBound({
          lower: 1,
          upper: 3,
        });
        return;
      }
      if (page >= pageCount - 2) {
        setPageBound({
          lower: pageCount - 2,
          upper: pageCount,
        });
        return;
      }
      setPageBound({
        lower: page - 1,
        upper: page + 1,
      });
    },
    [onPageChange, pageCount],
  );

  const renderPageNumbers = pageNumbers.map((pageNumber) => {
    if (pageNumber <= pageBound.upper && pageNumber >= pageBound.lower) {
      if (pageNumber < currentPage)
        return (
          <PageButton
            beforeActive
            key={pageNumber}
            pageNumber={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          />
        );
      if (pageNumber === currentPage)
        return (
          <PageButton
            active
            key={pageNumber}
            pageNumber={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          />
        );
      return (
        <PageButton
          afterActive
          key={pageNumber}
          pageNumber={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
        />
      );
    }
  });

  let pageIncrementButton = pageCount > pageBound.upper && (
    <PageButton
      afterActive
      dots
      onClick={() => handlePageChange(currentPage + 3)}
    />
  );

  let pageDecrementButton = pageBound.lower > 1 && (
    <PageButton
      beforeActive
      dots
      onClick={() => handlePageChange(currentPage - 3)}
    />
  );

  return (
    <View style={styles.container}>
      <PageButton leftArrow onClick={() => handlePageChange(currentPage - 1)} />
      {pageDecrementButton}
      {renderPageNumbers}
      {pageIncrementButton}
      <PageButton
        rightArrow
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </View>
  );
};

export default Pagination;

const PageButton = ({
  pageNumber,
  onClick,
  leftArrow,
  rightArrow,
  beforeActive,
  active,
  afterActive,
  dots,
}) => {
  const renderInnerChar =
    (pageNumber && (
      <Text style={[styles.buttonText, active && styles.buttonActiveText]}>
        {pageNumber}
      </Text>
    )) ||
    (leftArrow && <Text style={styles.buttonText}>&#60;</Text>) ||
    (rightArrow && <Text style={styles.buttonText}>&#62;</Text>) ||
    (dots && <Text style={styles.buttonText}>&hellip;</Text>);

  return (
    <Pressable onPress={() => onClick(pageNumber)}>
      <View
        style={[
          styles.button,
          (beforeActive && styles.beforeActive) ||
            (active && styles.active) ||
            (afterActive && styles.afterActive) ||
            (leftArrow && styles.leftArrow) ||
            (rightArrow && styles.rightArrow),
        ]}
      >
        {renderInnerChar}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: "white",
  },
  button: {
    padding: 8,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primary500,
    borderWidth: 2,
  },
  buttonActiveText: {
    color: "white",
  },
  buttonText: {
    color: Colors.primary500,
    fontSize: 22,
  },
  leftArrow: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
  },
  rightArrow: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0,
  },
  beforeActive: {
    borderRightWidth: 0,
  },
  active: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: Colors.primary500,
  },
  afterActive: {
    borderLeftWidth: 0,
  },
});
