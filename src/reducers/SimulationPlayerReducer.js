import TYPES from '../types';
import DEFAULTS from '../defaults';

export default SimulationPlayerReducer = (state = DEFAULTS.SIMULATION_PLAYER, action) => {

    switch(action.type) {

        case TYPES.SIMULATION_PLAYER.SET_DATA:
            return Object.assign({}, state, action.payload);

        case TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_SECOND:
            return Object.assign({}, state, {currentlyPlayedSecond: action.payload});

        case TYPES.SIMULATION_PLAYER.SET_SIMULATION_STATUS:
            return Object.assign({}, state, {simulationActive: action.payload});

        case TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_FRAMES:
            return Object.assign({}, state, {currentlyPlayedFrames: action.payload});

        case TYPES.SIMULATION_PLAYER.SET_CURRENTLY_PLAYED_FRAME:
            return Object.assign({}, state, {currentFrameIndex: action.payload});

    }

    return state;

}