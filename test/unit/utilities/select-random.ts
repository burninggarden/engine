import Tap          from 'tap';
import selectRandom from 'utilities/select-random';

Tap.test('returns a random item from the list', test => {
	const items = [5, 4, 3];

	let selected = null;

	while (selected !== 4) {
		selected = selectRandom(items);
	}

	test.ok('Received expected item');
	test.end();
});
