import PromiseWrapper from "@burninggarden/promise-wrapper";
import Clock from "clock";
import System from "system";
import BaseAction from "actions/base";

describe("Clock", () => {
	describe("start()", () => {
		it(".start() queues a clock update", async () => {
			const promiseWrapper = new PromiseWrapper();
			const clock = new Clock();

			class MockSystem extends System {
				public handleAction(action: BaseAction): void {
					throw new Error("Not implemented");
				}

				protected performClockUpdate(): void {
					clock.stop();
					promiseWrapper.resolve();
				}
			}

			clock.addSystem(new MockSystem());
			clock.start();

			await promiseWrapper.getPromise();
		});
	});

	describe("stop()", () => {
		it("cancels a queued clock update", async () => {
			const promiseWrapper = new PromiseWrapper();
			const clock = new Clock();

			class MockSystem extends System {
				public handleAction(action: BaseAction): void {
					throw new Error("Not implemented");
				}

				protected performClockUpdate(): void {
					throw new Error("Received unexpected update");
				}
			}

			clock.addSystem(new MockSystem());
			clock.start();
			clock.stop();

			setTimeout(() => {
				promiseWrapper.resolve();
			}, 20);

			await promiseWrapper.getPromise();
		});
	});

	it("calls tick() for each registered system", async () => {
		const promiseWrapper = new PromiseWrapper();

		class MockClock extends Clock {
			public constructor() {
				super();

				Object.assign(this, {
					getMillisecondsSinceLastTick(): number {
						return 123;
					},
				});
			}
		}

		const clock = new MockClock();

		class MockSystem extends System {
			public handleAction(action: BaseAction): void {
				throw new Error("Not implemented");
			}

			public tick(elapsedMilliseconds: number): void {
				expect(elapsedMilliseconds).toStrictEqual(123);
				clock.stop();
				promiseWrapper.resolve();
			}

			protected performClockUpdate(): void {
				throw new Error("Not implemented");
			}
		}

		clock.addSystem(new MockSystem());
		clock.start();

		await promiseWrapper.getPromise();
	});
});
