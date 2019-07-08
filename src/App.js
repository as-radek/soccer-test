import React from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';

import Root from './components/screens/Root';

import store from './Store';

export default App = (props) => {

    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <Root />
            </View>
        </Provider>
    );
}