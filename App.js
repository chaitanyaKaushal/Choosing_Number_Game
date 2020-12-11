import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import * as Font from "expo-font";
import { AppLoading } from "expo"; // this is going to prolong the screen until a specific task is completed

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/customfonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/customfonts/OpenSans-Bold.ttf"),
  }); //returns a promise, i.e. not return instantaneoulsy
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading // LOADING IS SUPER FAST
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)} // this is used to show error when loading the apis or other stuff fails, we can show alternative pages here to show error
      />
    );
  }

  const gameOverHandler = (numOfRounds) => {
    setRounds(numOfRounds);
  };

  const startGameHandler = (num) => {
    setUserNumber(num);
    setRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && rounds === 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        rounds={rounds}
        userNumber={userNumber}
        onStartNewGame={startGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
