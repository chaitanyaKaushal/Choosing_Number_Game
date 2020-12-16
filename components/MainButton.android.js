import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native'
import Colors from '../constants/colors'

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }
  return (
    <View style={styles.btnContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.highlight,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  btnContainer: {
    // to manage Ripple Effect within the rounded button
    borderRadius: 25,
    overflow: 'hidden',
  },
})

export default MainButton
