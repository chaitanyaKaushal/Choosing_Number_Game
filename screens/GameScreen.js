import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
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
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="HIGHER" onPress={() => {}} />
      </Card>
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
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
