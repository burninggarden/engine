import Tap                    from 'tap';
import ActionType             from 'enums/action-type';
import TileFactory            from 'factories/tile';
import TilesReducer           from 'reducers/tiles';
import EntityFactory          from 'factories/entity';
import AddTileActionCreator   from 'action-creators/add-tile';
import AddEntityActionCreator from 'action-creators/add-entity';

Tap.test('returns an empty array by default', test => {
	const result = TilesReducer(undefined, {
		type: ActionType.ADD_ENTITY
	});

	test.deepEqual(result, []);
	test.end();
});

Tap.test('handles AddTileAction', test => {
	const entity = TileFactory.createInstance();

	const action = (new AddTileActionCreator(entity))
		.createAction();

	const result = TilesReducer([], action);

	test.deepEqual(result, [entity]);
	test.end();
});

Tap.test('returns supplied array when given an unmapped action type', test => {
	const tile = TileFactory.createInstance();
	const entity = EntityFactory.createInstance();

	const action = (new AddEntityActionCreator(entity))
		.createAction();

	const result = TilesReducer([tile], action);

	test.deepEqual(result, [
		tile
	]);

	test.end();
});
