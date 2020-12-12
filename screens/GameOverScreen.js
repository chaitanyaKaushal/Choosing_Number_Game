import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import BodyStyling from "../constants/default-style";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const [dimensions, setDimensions] = useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  });

  useEffect(() => {
    const onChange = () => {
      setDimensions({
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      });
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text
          style={{
            ...BodyStyling.title,
            marginTop: dimensions.height < 400 ? 5 : 20,
          }}
        >
          The Game is Over!
        </Text>
        <View
          style={{
            ...styles.imageContainer,
            borderRadius: (dimensions.width * 0.7) / 2,
            width: dimensions.width * 0.7,
            height: dimensions.width * 0.7,
            marginVertical: dimensions.height / 20,
          }}
        >
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
        <View
          style={{
            ...styles.resultContainer,
            marginHorizontal: dimensions.height / 40,
          }}
        >
          <Text
            style={{
              ...BodyStyling.body,
              ...styles.textStyle,
              fontSize: dimensions.height < 400 ? 16 : 18,
            }}
          >
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess
            the number <Text style={styles.highlight}>{props.userNumber}</Text>
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
    </ScrollView>
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
    //this does not gaurantee that the image etc would fit on a single page, for that matter we need to add ScrollView and/or add .height * <some factor> in hieght ,width and border radius
    //image ko circle karne ke liye and for better formatting options

    // borderRadius: (Dimensions.get("window").width * 0.7) / 2, //border radius should be half both width and height to make a circle
    borderWidth: 3,
    borderColor: "black",
    // width: Dimensions.get("window").width * 0.7, //takes the dimensions of the parent container
    // height: Dimensions.get("window").width * 0.7,
    overflow: "hidden", // fits into the block
    // marginVertical: Dimensions.get("window").height / 20,
  },
  highlight: {
    color: Colors.highlight,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginVertical: 10,
    // marginHorizontal: Dimensions.get("window").height / 40,
    // // textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    // fontSize: Dimensions.get("window").height < 400 ? 16 : 18,
  },
  // title: {
  //   marginTop: Dimensions.get("window").height < 400 ? 5 : 20,
  // },
});

export default GameOverScreen;
