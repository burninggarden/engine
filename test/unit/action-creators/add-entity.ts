import ActionType from "enums/action-type";
import EntityFactory from "factories/entity";
import AddEntityActionCreator from "action-creators/add-entity";

describe("AddEntityActionCreator", () => {
	it("returns expected action payload", () => {
		const entity = EntityFactory.createInstance();
		const action = new AddEntityActionCreator(entity).createAction();

		expect(action).toEqual({
			type: ActionType.ADD_ENTITY,
			entity,
		});
	});
});
