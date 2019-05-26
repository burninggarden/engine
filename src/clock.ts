import System from 'system';

class Clock {

	private running        : boolean = false;
	private last_tick_time : number = 0;
	private timer          : null | number | NodeJS.Timer;
	private systems        : System[];
	private tick_rate      : number = 10;

	public constructor() {
		this.tick = this.tick.bind(this);
	}

	public start() : void {
		if (this.isRunning()) {
			return;
		}

		this.running = true;
		this.queueNextTick();
	}

	public stop() : void {
		if (this.isStopped()) {
			return;
		}

		this.running = false;
		this.cancelNextTick();
	}

	public addSystem(system: System) : void {
		return void this.getSystems().push(system);
	}

	private isRunning() : boolean {
		return this.running === true;
	}

	private isStopped() : boolean {
		return !this.isRunning();
	}

	private tick() : void {
		const
			now                  = Date.now(),
			elapsed_milliseconds = now - this.getLastTickTime();

		this.getSystems().forEach((system) => {
			system.tick(elapsed_milliseconds);
		});

		this.setLastTickTime(now);
		this.queueNextTick();
	}

	private getLastTickTime() : number {
		if (!this.last_tick_time) {
			this.last_tick_time = Date.now();
		}

		return this.last_tick_time;
	}

	private setLastTickTime(last_tick_time: number) : this {
		this.last_tick_time = last_tick_time;
		return this;
	}

	private queueNextTick() : void {
		if (this.isRunning()) {
			this.cancelNextTick();
			this.timer = setTimeout(this.tick, this.tick_rate);
		}
	}

	private cancelNextTick() : void {
		clearTimeout(this.timer as number);
	}

	/**
	 * @returns {Game_System[]}
	 */
	private getSystems() {
		if (!this.systems) {
			this.systems = [ ];
		}

		return this.systems;
	}

}

export default Clock;
