import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyStyling from "../constants/default-style";
import MainButton from "../components/MainButton";

import { Ionicons } from "@expo/vector-icons";

//this function was excluded from the component because it is independent of re-render of that component and it's states.

//exclude : to not get the correct guess when clicked on Start Game Btn i.e. first guess

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min); //to have integers
  max = Math.floor(max); //to have integers
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const currentLow = useRef(1); // min bound
  const currentHigh = useRef(100); // max bound
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]); // total turns taken to get the answer

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length); //sending in the rounds
    }
  }, [props.userChoice, props.onGameOver, currentGuess]); //on a re-render if no element is changed in dependency list,then, useEffect would not run

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

  const nextGuessHandler = (direction) => {
    //first let us validate
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    } else if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1; // so that we get a unique value because there was a chance of lower bound getting repeated because lowerbound was included in generateRandomBetween function
    }
    const newGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(newGuess);
    //toString() is applied to make guess as a unique key for FlatList (keyExtractor) -----------------------------------IMP------------------------------------------
    setPastGuesses((curPastGuesses) => [
      newGuess.toString(),
      ...curPastGuesses,
    ]); // pehle newGuess because sabse upar display hoga list mein
  };

  return (
    // <ScrollView>
    <View style={styles.screen}>
      <Text style={{ ...BodyStyling.title, ...styles.titleColor }}>
        Opponent's Guess
      </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.btnContainer,
          marginTop: dimensions.height > 600 ? 20 : 5,
        }}
      >
        {/* <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} /> */}
        {/* <Button
          title="HIGHER"
          onPress={nextGuessHandler.bind(this, "higher")}
        /> */}
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View
        style={{
          ...styles.listContainer,
          width: dimensions.width > 350 ? "60%" : "80%",
        }}
      >
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          keyExtractor={(item) => item}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
    // </ScrollView>
  );
};
//styles the list items
const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text style={BodyStyling.body}>#{listLength - itemData.index}</Text>
      <Text style={BodyStyling.body}>{itemData.item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  titleColor: {
    color: "black",
  },
  listItem: {
    borderColor: "#ccc",
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    justifyContent: "space-around",
    width: "100%", // for scrollview 60%
  },
  listContainer: {
    // width: Dimensions.get("window").width > 350 ? "60%" : "80%", //for scrollView 60% -> 80%
    flex: 1,
  },
  list: {
    // alignItems: "center", //for scrollview uncomment
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});

export default GameScreen;
