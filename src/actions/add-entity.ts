import Entity     from 'types/entity';
import BaseAction from 'actions/base';

interface AddEntityAction extends BaseAction {
	readonly entity : Entity;
}

export default AddEntityAction;
