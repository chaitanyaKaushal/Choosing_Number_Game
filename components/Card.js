import React from 'react';
import { View,StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 15,
        elevation: 10,//android
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        //ios -->
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },//width for x,
        shadowOpacity: 0.26,
        shadowRadius: 6,
        //till here
    }
});

export default Card;