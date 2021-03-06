import Faker from "faker";
import ActionType from "enums/action-type";
import PositionFactory from "factories/position";
import SetEntityPositionActionCreator from "action-creators/set-entity-position";

describe("SetEntityPositionActionCreator", () => {
	it("returns the expected action payload", () => {
		const entityId = Faker.random.uuid();
		const position = PositionFactory.createInstance();
		const action = new SetEntityPositionActionCreator(
			entityId,
			position
		).createAction();

		expect(action).toEqual({
			type: ActionType.SET_ENTITY_POSITION,
			entityId,
			position,
		});
	});
});
