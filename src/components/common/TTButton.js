import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default TTButton = ({icon, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon name={icon} color='#ffffff' size={20} />
        </TouchableOpacity>
    );
}