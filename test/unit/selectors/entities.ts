import Tap              from 'tap';
import StateFactory     from 'factories/state';
import EntityFactory    from 'factories/entity';
import EntitiesSelector from 'selectors/entities';

Tap.test('.getRandomEntity() returns random entity from state list', test => {
	const expected_entity = EntityFactory.createInstance();
	const state = StateFactory.createInstance({
		entities: [expected_entity]
	});

	const selector = new EntitiesSelector(state);
	const actual_entity = selector.getRandomEntity();

	test.equal(actual_entity, expected_entity);
	test.end();
});
