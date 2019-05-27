import Tile              from 'types/tile';
import ActionType        from 'enums/action-type';
import AddTileAction     from 'actions/add-tile';
import BaseActionCreator from 'action-creators/base';

class AddTileActionCreator extends BaseActionCreator {

	private tile : Tile;

	public constructor(tile: Tile) {
		super();
		this.tile = tile;
	}

	protected getActionPayload() : AddTileAction {
		return {
			type : ActionType.ADD_TILE,
			tile : this.getTile()
		};
	}

	private getTile() : Tile {
		return this.tile;
	}

}

export default AddTileActionCreator;
