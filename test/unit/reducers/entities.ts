import ActionType                     from 'enums/action-type';
import TileFactory                    from 'factories/tile';
import EntityFactory                  from 'factories/entity';
import PositionFactory                from 'factories/position';
import EntitiesReducer                from 'reducers/entities';
import AddTileActionCreator           from 'action-creators/add-tile';
import AddEntityActionCreator         from 'action-creators/add-entity';
import SetEntityPositionActionCreator from 'action-creators/set-entity-position';

describe('EntitiesReducer', () => {
	it('returns an empty array by default', () => {
		const result = EntitiesReducer(undefined, {
			type: ActionType.ADD_ENTITY
		});

		expect(result).toEqual([]);
	});

	it('handles AddEntityAction', () => {
		const entity = EntityFactory.createInstance();

		const action = (new AddEntityActionCreator(entity))
			.createAction();

		const result = EntitiesReducer([], action);

		expect(result).toEqual([entity]);
	});

	it('handles SetEntityPositionAction', () => {
		const position = PositionFactory.createInstance();

		const entity = EntityFactory.createInstance({
			position
		});

		const action = (new SetEntityPositionActionCreator(entity.id, position))
			.createAction();

		const result = EntitiesReducer([entity], action);

		expect(result).toEqual([
			{
				...entity,
				position
			}
		]);
	});

	it('returns supplied array when given an unmapped action type', () => {
		const entity = EntityFactory.createInstance();
		const tile = TileFactory.createInstance();

		const action = (new AddTileActionCreator(tile))
			.createAction();

		const result = EntitiesReducer([entity], action);

		expect(result).toEqual([
			entity
		]);
	});
});
