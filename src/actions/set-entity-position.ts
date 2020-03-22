import Position from "types/position";
import BaseAction from "actions/base";

interface SetEntityPositionAction extends BaseAction {
	readonly entityId: string;
	readonly position: Position;
}

export default SetEntityPositionAction;
