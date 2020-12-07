import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard, //Api
  Alert, // Api
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberedInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
    Keyboard.dismiss();
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be an element from 1-99", [
        { text: "Okay", style: "default", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}
    // >
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Enter a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            multiline={true}
            onChangeText={numberedInputHandler}
            value={enteredValue}
          />
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                title="Reset"
                color={Colors.accent}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.btn}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  btn: {
    width: "40%",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default StartGameScreen;
