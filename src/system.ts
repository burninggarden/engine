
abstract class System {

	private elapsed_milliseconds   : number = 0;
	private last_clock_update_time : number = 0;
	private clock_update_rate      : number = 1000;

	public isSubjectToClockUpdates() : boolean {
		return true;
	}

	public tick(elapsed_milliseconds: number) : void {
		this.elapsed_milliseconds += elapsed_milliseconds;

		if (this.shouldPerformClockUpdate()) {
			this.performClockUpdate();
			this.last_clock_update_time = this.elapsed_milliseconds;
		}
	}

	private shouldPerformClockUpdate() : boolean {
		return this.getTimeSinceLastTick() > this.clock_update_rate;
	}

	private getTimeSinceLastTick() {
		return this.elapsed_milliseconds - this.last_clock_update_time;
	}

	protected abstract performClockUpdate() : void;

}

export default System;
