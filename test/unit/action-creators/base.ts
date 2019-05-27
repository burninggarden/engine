import Tap               from 'tap';
import Faker             from 'faker';
import ActionType        from 'enums/action-type';
import BaseAction        from 'actions/base';
import BaseActionCreator from 'action-creators/base';

Tap.test('.createAction() returns the action payload', test => {
	interface MockAction extends BaseAction {
		mock_value: string;
	}

	const expected_action = {
		type:       ActionType.ADD_ENTITY,
		mock_value: Faker.random.uuid()
	};

	class MockActionCreator extends BaseActionCreator {
		protected getActionPayload() : MockAction {
			return expected_action;
		}
	}

	const actual_action = (new MockActionCreator()).createAction();

	test.deepEqual(actual_action, expected_action);
	test.end();
});
