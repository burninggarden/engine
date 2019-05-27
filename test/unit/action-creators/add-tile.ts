import Tap                  from 'tap';
import ActionType           from 'enums/action-type';
import TileFactory          from 'factories/tile';
import AddTileActionCreator from 'action-creators/add-tile';

Tap.test('.createAction() returns expected action payload', test => {
	const tile = TileFactory.createInstance();
	const action = (new AddTileActionCreator(tile))
		.createAction();

	test.deepEqual(action, {
		type: ActionType.ADD_TILE,
		tile
	});

	test.end();
});
