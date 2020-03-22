import Tile from "types/tile";
import BaseAction from "actions/base";

interface AddTileAction extends BaseAction {
	readonly tile: Tile;
}

export default AddTileAction;
