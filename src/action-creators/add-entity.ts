import Entity            from 'types/entity';
import ActionType        from 'enums/action-type';
import AddEntityAction   from 'actions/add-entity';
import BaseActionCreator from 'action-creators/base';


class AddEntityActionCreator extends BaseActionCreator {

	private entity : Entity;

	public constructor(entity: Entity) {
		super();
		this.entity = entity;
	}

	protected getActionPayload() : AddEntityAction {
		return {
			type   : ActionType.ADD_ENTITY,
			entity : this.getEntity()
		};
	}

	private getEntity() : Entity {
		return this.entity;
	}
}

export default AddEntityActionCreator;
