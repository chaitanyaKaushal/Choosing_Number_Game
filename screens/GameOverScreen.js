import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyStyling from "../constants/default-style";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={BodyStyling.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // source={require("../assets/success.png")}
          source={{
            uri:
              "https://lp-cms-production.imgix.net/image_browser/summit-toubkal-morocco.jpg",
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={{ ...BodyStyling.body, ...styles.textStyle }}>
          Your phone needed <Text style={styles.highlight}>{props.rounds}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </Text>
      </View>
      {/* <Button
        title="Start a New Game"
        onPress={() => props.onStartNewGame(null)}
      /> */}
      <MainButton onPress={() => props.onStartNewGame(null)}>
        Start a New Game
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", //takes the dimensions of the parent container
    height: "100%",
  },
  imageContainer: {
    //image ko circle karne ke liye and for better formatting options
    borderRadius: 150, //border radius should be half both width and height to make a circle
    borderWidth: 3,
    borderColor: "black",
    width: 300, //takes the dimensions of the parent container
    height: 300,
    overflow: "hidden", // fits into the block
    marginVertical: 30,
  },
  highlight: {
    color: Colors.highlight,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
    // textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default GameOverScreen;
