import Tile from "types/tile";
import ActionType from "enums/action-type";
import BaseAction from "actions/base";
import AddTileAction from "actions/add-tile";

function handleAddTileAction(state: Tile[], action: AddTileAction): Tile[] {
	return state.concat(action.tile);
}

function TilesReducer(state: Tile[] | undefined, action: BaseAction): Tile[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case ActionType.ADD_TILE:
			return handleAddTileAction(state, action as AddTileAction);
		default:
			return state;
	}
}

export default TilesReducer;
