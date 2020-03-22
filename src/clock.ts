import System from "system";

class Clock {
	private running: boolean = false;
	private lastTickTime: number = 0;
	private timer: NodeJS.Timer | undefined;
	private systems: System[];
	private tickRate: number = 10;

	public constructor() {
		this.tick = this.tick.bind(this);
		this.systems = [];
	}

	public start(): void {
		if (this.isRunning()) {
			return;
		}

		this.running = true;
		this.queueNextTick();
	}

	public stop(): void {
		if (this.isStopped()) {
			return;
		}

		this.running = false;
		this.cancelNextTick();
	}

	public addSystem(system: System): void {
		return void this.getSystems().push(system);
	}

	private isRunning(): boolean {
		return this.running === true;
	}

	private isStopped(): boolean {
		return !this.isRunning();
	}

	private tick(): void {
		const milliseconds = this.getMillisecondsSinceLastTick();

		this.getSystems().forEach((system) => {
			system.tick(milliseconds);
		});

		this.setLastTickTime(Date.now());
		this.queueNextTick();
	}

	private getMillisecondsSinceLastTick(): number {
		return Date.now() - this.getLastTickTime();
	}

	private getLastTickTime(): number {
		if (!this.lastTickTime) {
			this.lastTickTime = Date.now();
		}

		return this.lastTickTime;
	}

	private setLastTickTime(lastTickTime: number): this {
		this.lastTickTime = lastTickTime;
		return this;
	}

	private queueNextTick(): void {
		if (this.isRunning()) {
			this.cancelNextTick();
			this.timer = setTimeout(this.tick, this.tickRate);
		}
	}

	private cancelNextTick(): void {
		if (this.timer !== undefined) {
			clearTimeout(this.timer);
		}
	}

	private getSystems(): System[] {
		return this.systems;
	}
}

export default Clock;
