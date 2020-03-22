import Entity from "types/entity";
import BaseAction from "actions/base";
import ActionType from "enums/action-type";
import updateItemInList from "utilities/update-item-in-list";
import updateItem from "utilities/update-item";
import SetEntityPositionAction from "actions/set-entity-position";
import AddEntityAction from "actions/add-entity";

function handleAddEntityAction(
	state: Entity[],
	action: AddEntityAction
): Entity[] {
	return state.concat(action.entity);
}

function handleSetEntityPositionAction(
	state: Entity[],
	action: SetEntityPositionAction
): Entity[] {
	return updateItemInList(state, action.entityId, (entity) => {
		return updateItem(entity, {
			position: action.position,
		});
	});
}

function EntitiesReducer(
	state: Entity[] | undefined,
	action: BaseAction
): Entity[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case ActionType.ADD_ENTITY:
			return handleAddEntityAction(state, action as AddEntityAction);
		case ActionType.SET_ENTITY_POSITION:
			return handleSetEntityPositionAction(
				state,
				action as SetEntityPositionAction
			);
		default:
			return state;
	}
}

export default EntitiesReducer;
