import TYPES from '../types';

const setData = (data) => {
    return {
        type: TYPES.SIMULATION_PLAYER.SET_DATA,
        payload: data
    }
};

const setCurrentlyPlayedSecond = (second) => {
    return {
        type: TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_SECOND,
        payload: second
    };
};

const setSimulationStatus = (status) => {
    return {
        type: TYPES.SIMULATION_PLAYER.SET_SIMULATION_STATUS,
        payload: status
    }
}

const setCurrentlyPlayedFrame = (frameIndex) => {
    return {
        type: TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_FRAME,
        payload: frameIndex
    };
};

const setCurrentlyPlayedFrames = (frames) => {
    return {
        type: TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_FRAMES,
        payload: frames
    };
};

export { setData, setCurrentlyPlayedSecond, setSimulationStatus, setCurrentlyPlayedFrame, setCurrentlyPlayedFrames }