import Tap        from 'tap';
import updateItem from 'utilities/update-item';

interface Wizard {
	familiar        : string;
	school_of_magic : string;
}

Tap.test('Returns item with expected attributes', test => {
	const wizard: Wizard = {
		familiar:        'owl',
		school_of_magic: 'fire'
	};

	const updated_wizard = updateItem(wizard, {
		school_of_magic: 'ice'
	});

	test.deepEqual(updated_wizard, {
		familiar:        'owl',
		school_of_magic: 'ice'
	});
	test.end();
});
