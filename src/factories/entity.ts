import Faker from "faker";
import Entity from "types/entity";
import BaseFactory from "factories/base";
import PositionFactory from "factories/position";

class EntityFactory extends BaseFactory<Entity> {
	public static createInstance(attributes?: Partial<Entity>): Entity {
		return new this().createInstance(attributes);
	}

	public static createInstances(): Entity[] {
		return new this().createInstances();
	}

	public createInstance(attributes?: Partial<Entity>): Entity {
		return {
			id: Faker.random.uuid(),
			position: PositionFactory.createInstance(),
			...attributes,
		};
	}
}

export default EntityFactory;
