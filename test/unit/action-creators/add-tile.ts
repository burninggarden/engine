import ActionType from "enums/action-type";
import TileFactory from "factories/tile";
import AddTileActionCreator from "action-creators/add-tile";

describe("AddTileActionCreator", () => {
	it("returns expected payload", () => {
		const tile = TileFactory.createInstance();
		const action = new AddTileActionCreator(tile).createAction();

		expect(action).toEqual({
			type: ActionType.ADD_TILE,
			tile,
		});
	});
});
