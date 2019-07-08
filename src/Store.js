import { createStore } from 'redux';
import reducers from './reducers';

import DEFAULTS from './defaults';

export default createStore(reducers, {
    SimulationPlayer: DEFAULTS.SIMULATION_PLAYER
});