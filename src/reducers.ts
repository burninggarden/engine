import {combineReducers} from 'redux';
import EntitiesReducer   from 'reducers/entities';
import TilesReducer      from 'reducers/tiles';

const Reducers = combineReducers({
	entities : EntitiesReducer,
	tiles    : TilesReducer
});

export default Reducers;
