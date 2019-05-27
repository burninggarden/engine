/**
 * "With software, either the users control the program, or the program
 *  controls the users. If the program controls the users, and the developer
 *  controls the program, then the program is an instrument of unjust power."
 *
 *  - Stallman
 */

import Clock      from 'clock';
import Redux      from 'redux';
import Reducers   from 'reducers';
import BaseSystem from 'systems/base';
import BaseAction from 'actions/base';

import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	createStore,
	Dispatch,
	Middleware,
	MiddlewareAPI,
	StoreEnhancer
} from 'redux';

class Engine {

	private clock   : Clock;
	private systems : BaseSystem[];
	private store   : Redux.Store;

	public addSystem(system: BaseSystem) : this {
		this.getSystems().push(system);

		system.setStore(this.getStore());

		if (system.isSubjectToClockUpdates()) {
			this.getClock().addSystem(system);
		}

		return this;
	}

	public start() : void {
		this.getClock().start();
	}

	public stop() : void {
		this.getClock().stop();
	}

	private handleAction(action: BaseAction) : void {
		console.log(this.getStore().getState());

		this.getSystems().forEach(system => {
			system.handleAction(action);
		});
	}

	private getClock() : Clock {
		if (!this.clock) {
			this.clock = this.createClock();
		}

		return this.clock;
	}

	private createClock() : Clock {
		const clock = new Clock();

		return clock;
	}

	private getSystems() : BaseSystem[] {
		if (!this.systems) {
			this.systems = [ ];
		}

		return this.systems;
	}

	private getStore() : Redux.Store {
		if (!this.store) {
			this.store = this.createStore();
		}

		return this.store;
	}

	private createStore() : Redux.Store {
		return createStore(
			Reducers,
			this.createMiddleware()
		);
	}

	private createMiddleware() : StoreEnhancer {
		return applyMiddleware(this.getMiddleware());
	}

	private getMiddleware() : Middleware {
		return (store: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => {
			return (action: AnyAction) : void => {
				next(action);

				this.handleAction(action);
			};
		};
	}

}

export default Engine;
