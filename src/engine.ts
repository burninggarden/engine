/**
 * "With software, either the users control the program, or the program
 *  controls the users. If the program controls the users, and the developer
 *  controls the program, then the program is an instrument of unjust power."
 *
 *  - Stallman
 */

import Clock from "clock";
import Redux from "redux";
import System from "system";
import Reducers from "reducers";
import BaseAction from "actions/base";

import {
	AnyAction,
	applyMiddleware,
	createStore,
	Dispatch,
	Middleware,
	MiddlewareAPI,
	StoreEnhancer,
} from "redux";

class Engine {
	private clock: Clock;
	private systems: System[];
	private store: Redux.Store | undefined;

	public constructor() {
		this.clock = new Clock();
		this.systems = [];
	}

	public addSystem(system: System): this {
		this.getSystems().push(system);

		system.setStore(this.getStore());

		if (system.isSubjectToClockUpdates()) {
			this.getClock().addSystem(system);
		}

		return this;
	}

	public dispatchAction(action: BaseAction): void {
		this.getStore().dispatch(action);
	}

	public start(): void {
		this.getClock().start();
	}

	public stop(): void {
		this.getClock().stop();
	}

	public getStore(): Redux.Store {
		if (!this.store) {
			this.store = this.createStore();
		}

		return this.store;
	}

	private handleAction(action: BaseAction): void {
		this.getSystems().forEach((system) => {
			system.handleAction(action);
		});
	}

	private getClock(): Clock {
		return this.clock;
	}

	private getSystems(): System[] {
		return this.systems;
	}

	private createStore(): Redux.Store {
		return createStore(Reducers, this.createMiddleware());
	}

	private createMiddleware(): StoreEnhancer {
		return applyMiddleware(this.getMiddleware());
	}

	private getMiddleware(): Middleware {
		return (store: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => {
			return (action: AnyAction): void => {
				next(action);

				this.handleAction(action);
			};
		};
	}
}

export default Engine;
