import React, { Component } from 'react';
import { View, StyleSheet, Text, PixelRatio } from 'react-native';

import { connect } from 'react-redux';

import FieldImage from './FieldImage';
import Player from './common/Player';

import { setCurrentlyPlayedFrame } from '../actions/simulationPlayerActions';

class SoccerField extends Component {

    simulationFrames = null;
    rendererTimers = null;
    dimensions = null;
    pixelRatio = 1;

    constructor(props) {

        super(props);

        this.simulationFrames = [];
        this.rendererTimers = [];
        this.dimensions = {};
        this.pixelRatio = PixelRatio.get();

    }

    /**
     * We need to update component every frame 
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.currentFrameIndex !== nextProps.currentFrameIndex);
    }

    componentDidMount() {
        this.simulationFrames = this.props.frames;
    }

    render() {

        return (
            <View style={{flex: 1}} onLayout={({nativeEvent}) => this.dimensions = {w: nativeEvent.layout.width, h: nativeEvent.layout.height}}>
                {this._renderPlayers()}
                <FieldImage />
            </View>
        );

    }

    _renderPlayers() {

        if(this.props.frames.length == 0 || !this.dimensions.w) { return <View /> }

        let frameIndex = this.props.currentFrameIndex;

        if(frameIndex >= this.props.frames.length) {
            frameIndex = (this.props.frames.length - 1);
        }

        return this.props.frames[frameIndex].map((player) => {
            return <Player key={player[0]} id={player[0]} x={(player[1] * (this.dimensions.h / this.pixelRatio))} y={(player[2] * (this.dimensions.w / this.pixelRatio))} style={{zIndex: player[0]}} />
        });

    }

}

const stateProps = (state) => {
    return {
        currentlyPlayedSecond: state.SimulationPlayer.currentlyPlayedSecond,
        FPS: state.SimulationPlayer.FPS,
        frames: state.SimulationPlayer.frames,
        currentlyPlayedFrames: state.SimulationPlayer.currentlyPlayedFrames,
        currentFrameIndex: state.SimulationPlayer.currentFrameIndex
    };
};

const dispatchProps = {
    setCurrentlyPlayedFrame
};

export default connect(stateProps, dispatchProps)(SoccerField);