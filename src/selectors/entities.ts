import Entity       from 'types/entity';
import BaseSelector from 'selectors/base';
import selectRandom from 'utilities/select-random';

class EntitiesSelector extends BaseSelector {

	public getRandomEntity() : Entity | undefined {
		return selectRandom(this.getState().entities);
	}

}

export default EntitiesSelector;
