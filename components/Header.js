import React from 'react'
import { Text, StyleSheet, View, Platform } from 'react-native'
import Colors from '../constants/colors'

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text style={styles.headingTitle}>{props.title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: '15%',
    backgroundColor: Platform.OS === 'ios' ? 'white' : Colors.highlight,
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    // color: 'black',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTitle: {
    color: Platform.OS === 'ios' ? Colors.highlight : 'white',
    fontSize: 35,
    // fontStyle: "italic",
    fontFamily: 'open-sans-bold',
    // fontWeight: "bold",
  },
  headerIOS: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  headerAndroid: {
    backgroundColor: Colors.highlight,
  },
})
