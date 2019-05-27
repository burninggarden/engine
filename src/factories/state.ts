import State         from 'types/state';
import BaseFactory   from 'factories/base';
import TileFactory   from 'factories/tile';
import EntityFactory from 'factories/entity';

class StateFactory extends BaseFactory<State> {

	public static createInstance(attributes?: Partial<State>) : State {
		return (new this()).createInstance(attributes);
	}

	public static createInstances() : State[] {
		return (new this()).createInstances();
	}

	public createInstance(attributes?: Partial<State>) : State {
		const entities = EntityFactory.createInstances();
		const tiles = TileFactory.createInstances();

		return {
			entities: entities,
			tiles,
			...attributes
		};
	}

}

export default StateFactory;
