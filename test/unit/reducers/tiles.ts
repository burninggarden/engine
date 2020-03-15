import ActionType             from 'enums/action-type';
import TileFactory            from 'factories/tile';
import TilesReducer           from 'reducers/tiles';
import EntityFactory          from 'factories/entity';
import AddTileActionCreator   from 'action-creators/add-tile';
import AddEntityActionCreator from 'action-creators/add-entity';

describe('TilesReducer', () => {
	it('returns an empty array by default', () => {
		const result = TilesReducer(undefined, {
			type: ActionType.ADD_ENTITY
		});

		expect(result).toEqual([]);
	});

	it('handles AddTileAction', () => {
		const entity = TileFactory.createInstance();

		const action = (new AddTileActionCreator(entity))
			.createAction();

		const result = TilesReducer([], action);

		expect(result).toEqual([entity]);
	});

	it('returns supplied array when given an unmapped action type', () => {
		const tile = TileFactory.createInstance();
		const entity = EntityFactory.createInstance();

		const action = (new AddEntityActionCreator(entity))
			.createAction();

		const result = TilesReducer([tile], action);

		expect(result).toEqual([
			tile
		]);
	});
});
