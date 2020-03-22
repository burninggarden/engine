import { TimeInterval } from "@burninggarden/enums";
import Redux from "redux";
import State from "types/state";
import BaseAction from "actions/base";

abstract class System {
	private elapsedMilliseconds: number = 0;
	private lastClockUpdateTime: number = 0;
	private store: Redux.Store | undefined;

	public setStore(store: Redux.Store): this {
		this.store = store;
		return this;
	}

	public isSubjectToClockUpdates(): boolean {
		return true;
	}

	public tick(elapsedMilliseconds: number): void {
		this.incrementElapsedMilliseconds(elapsedMilliseconds);

		if (this.shouldPerformClockUpdate()) {
			this.performClockUpdate();
			this.setLastClockUpdateTime(this.getElapsedMilliseconds());
		}
	}

	protected dispatchAction(action: BaseAction): void {
		this.getStore().dispatch(action);
	}

	protected getState(): State {
		return this.getStore().getState() as State;
	}

	protected getClockUpdateRate(): number {
		return TimeInterval.ONE_SECOND;
	}

	private getStore(): Redux.Store {
		if (this.store === undefined) {
			throw new Error("Tried to read store, but it was not set");
		}

		return this.store;
	}

	private incrementElapsedMilliseconds(elapsedMilliseconds: number): void {
		this.elapsedMilliseconds += elapsedMilliseconds;
	}

	private shouldPerformClockUpdate(): boolean {
		return this.getTimeSinceLastTick() > this.getClockUpdateRate();
	}

	private getTimeSinceLastTick(): number {
		return this.elapsedMilliseconds - this.lastClockUpdateTime;
	}

	private setLastClockUpdateTime(lastClockUpdateTime: number): this {
		this.lastClockUpdateTime = lastClockUpdateTime;
		return this;
	}

	private getElapsedMilliseconds(): number {
		return this.elapsedMilliseconds;
	}

	public abstract handleAction(action: BaseAction): void;

	protected abstract performClockUpdate(): void;
}

export default System;
