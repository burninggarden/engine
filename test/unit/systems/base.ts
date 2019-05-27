import Tap           from 'tap';
import BaseSystem    from 'systems/base';
import BaseAction    from 'actions/base';
import {createStore} from 'redux';


class MockSystem extends BaseSystem {

	public handleAction(action: BaseAction) : void {
		throw new Error('Received unexpected action');
	}

	protected performClockUpdate() : void {
		throw new Error('Received unexpected clock update');
	}

}

Tap.test('.setStore() assigns the supplied store and returns the system instance for chaining', test => {
	const system = new MockSystem();

	const store = createStore((state, action) => {
		return state || { };
	});

	test.equal(system.setStore(store), system);
	test.end();
});

Tap.test('.isSubjectToClockUpdates() returns true by default', test => {
	const system = new MockSystem();

	test.ok(system.isSubjectToClockUpdates());
	test.end();
});

Tap.test('.tick() performs clock update if enough time has elapsed since last update', test => {
	class FastUpdatingSystem extends MockSystem {
		protected getClockUpdateRate() : number {
			return 25;
		}

		protected performClockUpdate() : void {
			test.ok('Received expected clock update');
			test.end();
		}
	}

	const system = new FastUpdatingSystem();

	system.tick(50);
});

Tap.test('.tick() does not perform update if not enough time has passed since last update', test => {
	class SlowUpdatingSystem extends MockSystem {
		protected getClockUpdateRate() : number {
			return 100;
		}

		protected performClockUpdate() : void {
			throw new Error('Received unexpected update');
		}
	}

	const system = new SlowUpdatingSystem();

	system.tick(50);
	test.end();
});
