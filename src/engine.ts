/**
 * "With software, either the users control the program, or the program
 *  controls the users. If the program controls the users, and the developer
 *  controls the program, then the program is an instrument of unjust power."
 *
 *  - Stallman
 */

import Clock  from 'clock';
import System from 'system';

class Engine {

	private clock   : Clock;
	private systems : System[];

	public addSystem(system: System) : this {
		this.getSystems().push(system);
		return this;
	}

	public start() : void {
		this.getClock().start();
	}

	public stop() : void {
		this.getClock().stop();
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

	private getSystems() : System[] {
		if (!this.systems) {
			this.systems = [ ];
		}

		return this.systems;
	}

}

export default Engine;
