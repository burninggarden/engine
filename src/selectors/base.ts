import State from 'types/state';

class BaseSelector {

	private state : State;

	public constructor(state: State) {
		this.state = state;
	}

	protected getState() : State {
		return this.state;
	}

}

export default BaseSelector;
