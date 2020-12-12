import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.headingTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    width: "100%",
    height: "15%",
    backgroundColor: "crimson",
    // color: 'black',
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headingTitle: {
    color: "black",
    fontSize: 35,
    // fontStyle: "italic",
    fontFamily: "open-sans-bold",
    // fontWeight: "bold",
  },
});
