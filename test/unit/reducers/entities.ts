import Tap                            from 'tap';
import ActionType                     from 'enums/action-type';
import TileFactory                    from 'factories/tile';
import EntityFactory                  from 'factories/entity';
import PositionFactory                from 'factories/position';
import EntitiesReducer                from 'reducers/entities';
import AddTileActionCreator           from 'action-creators/add-tile';
import AddEntityActionCreator         from 'action-creators/add-entity';
import SetEntityPositionActionCreator from 'action-creators/set-entity-position';

Tap.test('returns an empty array by default', test => {
	const result = EntitiesReducer(undefined, {
		type: ActionType.ADD_ENTITY
	});

	test.deepEqual(result, []);
	test.end();
});

Tap.test('handles AddEntityAction', test => {
	const entity = EntityFactory.createInstance();

	const action = (new AddEntityActionCreator(entity))
		.createAction();

	const result = EntitiesReducer([], action);

	test.deepEqual(result, [entity]);
	test.end();
});

Tap.test('handles SetEntityPositionAction', test => {
	const position = PositionFactory.createInstance();

	const entity = EntityFactory.createInstance({
		position
	});

	const action = (new SetEntityPositionActionCreator(entity.id, position))
		.createAction();

	const result = EntitiesReducer([entity], action);

	test.deepEqual(result, [
		{
			...entity,
			position
		}
	]);

	test.end();
});

Tap.test('returns supplied array when given an unmapped action type', test => {
	const entity = EntityFactory.createInstance();
	const tile = TileFactory.createInstance();

	const action = (new AddTileActionCreator(tile))
		.createAction();

	const result = EntitiesReducer([entity], action);

	test.deepEqual(result, [
		entity
	]);

	test.end();
});
