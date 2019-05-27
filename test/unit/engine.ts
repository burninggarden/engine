import Tap                    from 'tap';
import Engine                 from 'engine';
import BaseSystem             from 'systems/base';
import BaseAction             from 'actions/base';
import EntityFactory          from 'factories/entity';
import AddEntityActionCreator from 'action-creators/add-entity';

Tap.test('.start() queues a clock update for systems subject to them', test => {
	const engine = new Engine();

	class MockSystem extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		protected performClockUpdate(): void {
			test.ok('Received expected update');
			engine.stop();
			test.end();
		}

	}

	engine.addSystem(new MockSystem());
	engine.start();
});

Tap.test('.start() does not queue a clock update for systems that are not subject to them', test => {
	const engine = new Engine();

	class MockSystem extends BaseSystem {

		public isSubjectToClockUpdates() : boolean {
			return false;
		}

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		protected performClockUpdate(): void {
			throw new Error('Received unexpected update');
		}

	}

	engine.addSystem(new MockSystem());
	engine.start();
	test.ok('No updates were triggered');
	engine.stop();
	test.end();
});

Tap.test('.stop() cancels a queued clock update', test => {
	const engine = new Engine();

	class MockSystem extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		protected performClockUpdate(): void {
			test.notOk('Received unexpected update');
			test.end();
		}

	}

	engine.addSystem(new MockSystem());
	engine.start();
	engine.stop();

	setTimeout(() => {
		test.ok('Did not receive clock update');
		test.end();
	}, 20);
});

Tap.test('Forwards dispatched actions to all connected systems in the order they were added', test => {
	const engine = new Engine();

	const entity = EntityFactory.createInstance();
	const expected_action = new AddEntityActionCreator(entity).createAction();

	class SystemA extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			test.deepEqual(action, expected_action);
		}

		protected performClockUpdate(): void {
			throw new Error('Received unexpected clock update');
		}

	}

	class SystemB extends BaseSystem {

		public publicDispatch(action: BaseAction) : void {
			this.dispatchAction(action);
		}

		public handleAction(action: BaseAction) : void {
			test.deepEqual(action, expected_action);
			test.end();
		}

		protected performClockUpdate(): void {
			throw new Error('Received unexpected clock update');
		}

	}

	const system_a = new SystemA();
	const system_b = new SystemB();

	engine.addSystem(system_a);
	engine.addSystem(system_b);

	system_b.publicDispatch(expected_action);
});
