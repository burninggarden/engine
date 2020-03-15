import PromiseWrapper         from '@burninggarden/promise-wrapper';
import Engine                 from 'engine';
import System                 from 'system';
import BaseAction             from 'actions/base';
import EntityFactory          from 'factories/entity';
import AddEntityActionCreator from 'action-creators/add-entity';

describe('Engine', () => {
	describe('start()',  () => {
		it('queues a clock update for systems subject to them', async () => {
			const promiseWrapper = new PromiseWrapper();
			const engine = new Engine();

			class MockSystem extends System {

				public handleAction(action: BaseAction) : void {
					throw new Error('Not implemented');
				}

				protected performClockUpdate(): void {
					engine.stop();
					promiseWrapper.resolve();
				}

			}

			engine.addSystem(new MockSystem());
			engine.start();

			await promiseWrapper.getPromise();
		});

		it('does not queue a clock update for systems that are not subject to them', () => {
			const engine = new Engine();

			class MockSystem extends System {

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
			engine.stop();
		});
	});

	describe('stop()', () => {
		it('cancels a queued clock update', async () => {
			const promiseWrapper = new PromiseWrapper();
			const engine = new Engine();

			class MockSystem extends System {

				public handleAction(action: BaseAction) : void {
					throw new Error('Not implemented');
				}

				protected performClockUpdate(): void {
					throw new Error('Received unexpected update');
				}

			}

			engine.addSystem(new MockSystem());
			engine.start();
			engine.stop();

			setTimeout(() => {
				promiseWrapper.resolve();
			}, 20);

			await promiseWrapper.getPromise();
		});
	});

	it('Forwards dispatched actions to all connected systems in the order they were added', async () => {
		const promiseWrapper = new PromiseWrapper();
		const engine = new Engine();

		const entity = EntityFactory.createInstance();
		const expected_action = new AddEntityActionCreator(entity).createAction();

		class SystemA extends System {

			public handleAction(action: BaseAction) : void {
				expect(action).toEqual(expected_action);
			}

			protected performClockUpdate(): void {
				throw new Error('Received unexpected clock update');
			}

		}

		class SystemB extends System {

			public publicDispatch(action: BaseAction) : void {
				this.dispatchAction(action);
			}

			public handleAction(action: BaseAction) : void {
				expect(action).toEqual(expected_action);

				promiseWrapper.resolve();
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

		await promiseWrapper.getPromise();
	});
});
