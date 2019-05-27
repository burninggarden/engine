import BaseAction from 'actions/base';

abstract class BaseActionCreator {

	public createAction() : BaseAction {
		return this.getActionPayload();
	}

	protected abstract getActionPayload() : BaseAction;

}

export default BaseActionCreator;
