import Position   from 'types/position';
import BaseAction from 'actions/base';

interface SetEntityPositionAction extends BaseAction {
	readonly entity_id : string;
	readonly position  : Position;
}

export default SetEntityPositionAction;
