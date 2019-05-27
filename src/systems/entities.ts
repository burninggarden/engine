import BaseSystem                     from 'systems/base';
import BaseAction                     from 'actions/base';
import EntityFactory                  from 'factories/entity';
import EntitiesSelector               from 'selectors/entities';
import AddEntityActionCreator         from 'action-creators/add-entity';
import SetEntityPositionActionCreator from 'action-creators/set-entity-position';


class EntitiesSystem extends BaseSystem {

	public handleAction(action: BaseAction) : void {
		switch (action.type) {
			default:
				return;
		}
	}

	protected performClockUpdate() : void {
		if (Math.random() < 0.05) {
			this.addEntity();
		}

		if (Math.random() < 0.05) {
			this.updateRandomEntityPosition();
		}
	}

	protected getClockUpdateRate() : number {
		return 100;
	}

	private addEntity() : void {
		const entity = EntityFactory.createInstance();
		const action = (new AddEntityActionCreator(entity))
			.createAction();

		this.dispatchAction(action);
	}

	private updateRandomEntityPosition() : void {
		const selector = new EntitiesSelector(this.getState());
		const entity = selector.getRandomEntity();

		if (entity === undefined) {
			return;
		}

		const position = {
			x: entity.position.x,
			y: entity.position.y + 1
		};

		const action = (new SetEntityPositionActionCreator(entity.id, position))
			.createAction();

		this.dispatchAction(action);
	}

}

export default EntitiesSystem;
