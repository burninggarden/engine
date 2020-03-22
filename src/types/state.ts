import Tile from "types/tile";
import Entity from "types/entity";

interface State {
	entities: Entity[];
	tiles: Tile[];
}

export default State;
