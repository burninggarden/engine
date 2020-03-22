import Position from "types/position";
import ActionType from "enums/action-type";
import SetEntityPositionAction from "actions/set-entity-position";
import BaseActionCreator from "action-creators/base";

class SetEntityPositionActionCreator extends BaseActionCreator {
	private entityId: string;
	private position: Position;

	public constructor(entityId: string, position: Position) {
		super();

		this.entityId = entityId;
		this.position = position;
	}

	protected getActionPayload(): SetEntityPositionAction {
		return {
			type: ActionType.SET_ENTITY_POSITION,
			entityId: this.getEntityId(),
			position: this.getPosition(),
		};
	}

	private getEntityId(): string {
		return this.entityId;
	}

	private getPosition(): Position {
		return this.position;
	}
}

export default SetEntityPositionActionCreator;
