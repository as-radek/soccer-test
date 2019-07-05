import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { connect } from 'react-redux';

class Player extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    shouldComponentUpdate() {

    }

    render() {

        return (
            <View style={styles.playerStyle}>
                <Text style={styles.playerIdStyle}>{this.props.id}</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    playerStyle: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#4287f5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    playerIdStyle: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '300'
    }
});

const stateProps = (state) => {
    return {
        
    };
};

const dispatchProps = {

}

export default connect(stateProps, dispatchProps)(Player);