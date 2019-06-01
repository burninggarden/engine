import Tap        from 'tap';
import Clock      from 'clock';
import BaseSystem from 'systems/base';
import BaseAction from 'actions/base';

Tap.test('.start() queues a clock update', test => {
	const clock = new Clock();

	class MockSystem extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		protected performClockUpdate(): void {
			test.ok('Received expected update');
			clock.stop();
			test.end();
		}

	}

	clock.addSystem(new MockSystem());
	clock.start();
});

Tap.test('.stop() cancels a queued clock update', test => {
	const clock = new Clock();

	class MockSystem extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		protected performClockUpdate(): void {
			test.notOk('Received unexpected update');
			test.end();
		}

	}

	clock.addSystem(new MockSystem());
	clock.start();
	clock.stop();

	setTimeout(() => {
		test.ok('Did not receive clock update');
		test.end();
	}, 20);
});

Tap.test('calls tick() for each registered system', test => {
	class MockClock extends Clock {

		public constructor() {
			super();

			Object.assign(this, {
				getMillisecondsSinceLastTick() : number {
					return 123;
				}
			});
		}

	}

	const clock = new MockClock();

	class MockSystem extends BaseSystem {

		public handleAction(action: BaseAction) : void {
			throw new Error('Not implemented');
		}

		public tick(elapsed_milliseconds: number): void {
			test.equal(elapsed_milliseconds, 123);
			clock.stop();
			test.end();
		}

		protected performClockUpdate() : void {
			throw new Error('Not implemented');
		}
	}

	clock.addSystem(new MockSystem());
	clock.start();
});
