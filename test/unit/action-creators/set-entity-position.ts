import Tap                            from 'tap';
import Faker                          from 'faker';
import ActionType                     from 'enums/action-type';
import PositionFactory                from 'factories/position';
import SetEntityPositionActionCreator from 'action-creators/set-entity-position';

Tap.test('.createAction() returns expected action payload', test => {
	const entity_id = Faker.random.uuid();
	const position = PositionFactory.createInstance();
	const action = new SetEntityPositionActionCreator(
		entity_id,
		position
	).createAction();

	test.deepEqual(action, {
		type: ActionType.SET_ENTITY_POSITION,
		entity_id,
		position
	});

	test.end();
});
