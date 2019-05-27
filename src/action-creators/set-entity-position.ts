import Position                from 'types/position';
import ActionType              from 'enums/action-type';
import SetEntityPositionAction from 'actions/set-entity-position';
import BaseActionCreator       from 'action-creators/base';


class SetEntityPositionActionCreator extends BaseActionCreator {

	private entity_id : string;
	private position  : Position;

	public constructor(entity_id: string, position: Position) {
		super();

		this.entity_id = entity_id;
		this.position  = position;
	}

	protected getActionPayload() : SetEntityPositionAction {
		return {
			type      : ActionType.SET_ENTITY_POSITION,
			entity_id : this.getEntityId(),
			position  : this.getPosition()
		};
	}

	private getEntityId() : string {
		return this.entity_id;
	}

	private getPosition() : Position {
		return this.position;
	}

}

export default SetEntityPositionActionCreator;
