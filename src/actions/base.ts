import { AnyAction } from "redux";
import ActionType from "enums/action-type";

interface BaseAction extends AnyAction {
	readonly type: ActionType;
}

export default BaseAction;
