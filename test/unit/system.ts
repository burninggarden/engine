import PromiseWrapper from "@burninggarden/promise-wrapper";
import System from "system";
import BaseAction from "actions/base";
import { createStore } from "redux";

class MockSystem extends System {
	public handleAction(action: BaseAction): void {
		throw new Error("Received unexpected action");
	}

	protected performClockUpdate(): void {
		throw new Error("Received unexpected clock update");
	}
}

describe("System", () => {
	describe("setStore()", () => {
		it("assigns the supplied store and returns the system instance for chaining", () => {
			const system = new MockSystem();

			const store = createStore((state, action) => {
				return state || {};
			});

			expect(system.setStore(store)).toStrictEqual(system);
		});
	});

	describe("isSubjectToClockUpdates()", () => {
		it("returns true by default", () => {
			const system = new MockSystem();

			expect(system.isSubjectToClockUpdates()).toBe(true);
		});
	});

	describe("tick()", () => {
		it("performs clock update if enough time has elapsed since last update", async () => {
			const promiseWrapper = new PromiseWrapper();

			class FastUpdatingSystem extends MockSystem {
				protected getClockUpdateRate(): number {
					return 25;
				}

				protected performClockUpdate(): void {
					promiseWrapper.resolve();
				}
			}

			const system = new FastUpdatingSystem();

			system.tick(50);

			await promiseWrapper.getPromise();
		});

		it("does not perform update if not enough time has passed since last update", async () => {
			const promiseWrapper = new PromiseWrapper();

			class SlowUpdatingSystem extends MockSystem {
				protected getClockUpdateRate(): number {
					return 100;
				}

				protected performClockUpdate(): void {
					throw new Error("Received unexpected update");
				}
			}

			const system = new SlowUpdatingSystem();

			system.tick(50);

			setTimeout(() => {
				promiseWrapper.resolve();
			}, 100);

			await promiseWrapper.getPromise();
		});
	});
});
