import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { connect } from 'react-redux';

import Slider from '@react-native-community/slider';

import TTButton from './common/TTButton';

import { setCurrentlyPlayedSecond, setSimulationStatus, setCurrentlyPlayedFrames, setCurrentlyPlayedFrame } from '../actions/simulationPlayerActions';

const styles = StyleSheet.create({
    timeTrackerStyle: {
        height: 40
    },
    timeStyle: {
        color: '#ffffff',
        fontSize: 10
    },
    trackerControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    trackingLineStyle: {
        paddingLeft: 10,
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
    },
    timesContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    }
});

class TimeTracker extends Component {

    ticker = null;
    frameTicker = null;

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            (this.props.currentlyPlayedSecond !== nextProps.currentlyPlayedSecond) || 
            (this.props.simulationActive !== nextProps.simulationActive) || 
            (this.props.totalDuration !== nextProps.totalDuration)
        );
    }

    render() {

        return (
            <View style={styles.timeTrackerStyle}>
                <View style={styles.trackerControlsContainer}>
                    {this.props.simulationActive ? <TTButton icon="ios-pause" onPress={this._simulationPause.bind(this)} /> : <TTButton onPress={this._simulationPlay.bind(this)} icon="ios-play" />}
                    <Slider
                        style={styles.trackingLineStyle}
                        step={1}
                        value={this.props.currentlyPlayedSecond}
                        maximumValue={this.props.totalDuration}
                        onValueChange={this._onTimeFrameRequested.bind(this)}
                    />
                </View>
                <View style={styles.timesContainerStyle}>
                    <Text style={styles.timeStyle}>{this._formatTime(this.props.currentlyPlayedSecond)}</Text>
                    <Text style={styles.timeStyle}>{this._formatTime(this.props.totalDuration)}</Text>
                </View>
            </View>
        );

    }

    _formatTime(seconds) {

        let minutes = parseInt(Math.floor(seconds/60));
        let seconds_left = parseInt(Math.floor(seconds%60));

        minutes = minutes >= 0 && minutes < 10 ? `0${minutes}` : minutes;
        seconds_left = seconds_left >= 0 && seconds_left < 10 ? `0${seconds_left}` : seconds_left;

        return `${minutes}:${seconds_left}`;

    }

    _simulationPlay() {

        this._simulationStop();

        if(this.props.currentlyPlayedSecond >= this.props.totalDuration) {
            this.props.setCurrentlyPlayedSecond(0);
        }

        if(this.props.currentFrameIndex >= this.props.frames.length) {
            this.props.setCurrentlyPlayedFrame(0);
        }

        /**
         * Starts tickers
         */
        this.props.setSimulationStatus(true);
        this.ticker = setInterval(this._simulationTick.bind(this), 1000);
        this.frameTicker = setInterval(this._frameTick.bind(this), this.props.FPS);

    }

    _simulationPause() {
        this.props.setSimulationStatus(false);
        clearInterval(this.ticker);
        clearInterval(this.frameTicker);
    }

    _simulationStop() {
        this._simulationPause();
    }

    /**
     * Fired every second
     */
    _simulationTick() {

        if(this.props.currentlyPlayedSecond >= this.props.totalDuration) {
            this._simulationStop();
            return;
        }
        
        this.props.setCurrentlyPlayedSecond((this.props.currentlyPlayedSecond+=1));

    }

    /**
     * Fired every this.props.FPS (29.79 ms in this example)
     */
    _frameTick() {

        if(this.props.currentFrameIndex >= this.props.frames.length) {
            this._simulationStop();
            return;
        }

        this.props.setCurrentlyPlayedFrame(this.props.currentFrameIndex+=1);

    }

    /**
     * Event handler fired when slider value change
     * 
     * @param {Number[Integer]} second Slider value
     */
    _onTimeFrameRequested(second) {

        //We need this to decide wheter play simulation after slide or not
        let isActive = this.props.simulationActive;

        if(isActive) {
            this._simulationStop();
        }
        
        this.props.setCurrentlyPlayedSecond(second);
        this.props.setCurrentlyPlayedFrame(this.__mapSecondToFrameIndex(second));

        if(isActive) {
            this._simulationPlay();
        }
        
    }

    __mapSecondToFrameIndex(second) {
        return parseInt(Math.floor((second * this.props.FPS)));
    }

}

const stateProps = (state) => {
    return {
        simulationActive: state.SimulationPlayer.simulationActive,
        currentlyPlayedSecond: state.SimulationPlayer.currentlyPlayedSecond,
        currentFrameIndex: state.SimulationPlayer.currentFrameIndex,
        totalDuration: state.SimulationPlayer.totalDuration,
        frames: state.SimulationPlayer.frames,
        FPS: state.SimulationPlayer.FPS
    };
};

const dispatchProps = {
    setCurrentlyPlayedSecond,
    setSimulationStatus,
    setCurrentlyPlayedFrames,
    setCurrentlyPlayedFrame
};

export default connect(stateProps, dispatchProps)(TimeTracker);