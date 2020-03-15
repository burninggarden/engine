import Faker             from 'faker';
import ActionType        from 'enums/action-type';
import BaseAction        from 'actions/base';
import BaseActionCreator from 'action-creators/base';

describe('BaseActionCreator', () => {
	it('returns the expected action payload', () => {
		interface MockAction extends BaseAction {
			mockValue: string;
		}

		const expectedAction = {
			type:      ActionType.ADD_ENTITY,
			mockValue: Faker.random.uuid()
		};

		class MockActionCreator extends BaseActionCreator {
			protected getActionPayload() : MockAction {
				return expectedAction;
			}
		}

		const actualAction = (new MockActionCreator()).createAction();

		expect(actualAction).toEqual(expectedAction);
	});
});
