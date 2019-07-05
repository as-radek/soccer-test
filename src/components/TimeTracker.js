import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { connect } from 'react-redux';

class TimeTracker extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return (
            <View />
        );

    }

}

const stateProps = (state) => {
    return {

    };
};

const dispatchProps = {

};

export default connect(stateProps, dispatchProps)(TimeTracker);