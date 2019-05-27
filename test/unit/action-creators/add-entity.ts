import Tap                    from 'tap';
import ActionType             from 'enums/action-type';
import EntityFactory          from 'factories/entity';
import AddEntityActionCreator from 'action-creators/add-entity';

Tap.test('.createAction() returns expected action payload', test => {
	const entity = EntityFactory.createInstance();
	const action = new AddEntityActionCreator(entity).createAction();

	test.deepEqual(action, {
		type: ActionType.ADD_ENTITY,
		entity
	});

	test.end();
});
