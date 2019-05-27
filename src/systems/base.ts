import Redux         from 'redux';
import State         from 'types/state';
import BaseAction    from 'actions/base';
import TimeIntervals from 'constants/time-intervals';

abstract class BaseSystem {

	private elapsed_milliseconds   : number = 0;
	private last_clock_update_time : number = 0;
	private store                  : Redux.Store;

	public setStore(store: Redux.Store) : this {
		this.store = store;
		return this;
	}

	public isSubjectToClockUpdates() : boolean {
		return true;
	}

	public tick(elapsed_milliseconds: number) : void {
		this.incrementElapsedMilliseconds(elapsed_milliseconds);

		if (this.shouldPerformClockUpdate()) {
			this.performClockUpdate();
			this.setLastClockUpdateTime(this.getElapsedMilliseconds());
		}
	}

	protected dispatchAction(action: BaseAction) : void {
		this.getStore().dispatch(action);
	}

	protected getState() : State {
		return this.getStore().getState() as State;
	}

	protected getClockUpdateRate() : number {
		return TimeIntervals.ONE_SECOND;
	}

	private getStore() : Redux.Store {
		return this.store;
	}

	private incrementElapsedMilliseconds(elapsed_milliseconds: number) : void {
		this.elapsed_milliseconds += elapsed_milliseconds;
	}

	private shouldPerformClockUpdate() : boolean {
		return this.getTimeSinceLastTick() > this.getClockUpdateRate();
	}

	private getTimeSinceLastTick() {
		return this.elapsed_milliseconds - this.last_clock_update_time;
	}

	private setLastClockUpdateTime(last_update_time: number) : this {
		this.last_clock_update_time = last_update_time;
		return this;
	}

	private getElapsedMilliseconds() : number {
		return this.elapsed_milliseconds;
	}

	public abstract handleAction(action: BaseAction) : void;

	protected abstract performClockUpdate() : void;

}

export default BaseSystem;
