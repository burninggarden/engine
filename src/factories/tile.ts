import Tile from "types/tile";
import Faker from "faker";
import BaseFactory from "factories/base";

class TileFactory extends BaseFactory<Tile> {
	public static createInstance(attributes?: Partial<Tile>): Tile {
		return new this().createInstance(attributes);
	}

	public static createInstances(): Tile[] {
		return new this().createInstances();
	}

	public createInstance(attributes?: Partial<Tile>): Tile {
		return {
			id: Faker.random.uuid(),
			entityIds: [],
			...attributes,
		};
	}
}

export default TileFactory;
