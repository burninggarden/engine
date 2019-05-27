import Tap          from 'tap';
import State        from 'types/state';
import StateFactory from 'factories/state';
import BaseSelector from 'selectors/base';

Tap.test('allows child classes to retrieve the state', test => {
	const expectedState = StateFactory.createInstance();

	class MockSelector extends BaseSelector {

		public overriddenGetState() : State {
			return this.getState();
		}

	}

	const selector = new MockSelector(expectedState);
	const actualState = selector.overriddenGetState();

	test.deepEqual(actualState, expectedState);
	test.end();
});
