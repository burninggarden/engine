
import Engine         from 'engine';
import EntitiesSystem from 'systems/entities';

(new Engine())
	.addSystem(new EntitiesSystem())
	.start();
