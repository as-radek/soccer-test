import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fieldStyle: {
        flex: 1
    }
});

export default class FieldImage extends Component {

    shouldComponentUpdate() { return false; }
    
    render() {
        return <ImageBackground style={styles.fieldStyle} resizeMode='contain' source={require('../assets/images/soccer.png')} />
    }

}