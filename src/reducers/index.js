import { combineReducers } from 'redux';

import SimulationPlayerReducer from './SimulationPlayerReducer';

export default combineReducers({
    SimulationPlayer: SimulationPlayerReducer
});

