import Faker       from 'faker';
import Position    from 'types/position';
import BaseFactory from 'factories/base';

class PositionFactory extends BaseFactory<Position> {

	public static createInstance(attributes?: Partial<Position>) : Position {
		return (new this()).createInstance(attributes);
	}

	public static createInstances() : Position[] {
		return (new this()).createInstances();
	}

	public createInstance(attributes?: Partial<Position>) : Position {
		return {
			x : Faker.random.number(),
			y : Faker.random.number(),
			...attributes
		};
	}

}

export default PositionFactory;
