import Tap              from 'tap';
import updateItemInList from 'utilities/update-item-in-list';

interface Wizard {
	id              : string;
	school_of_magic : string;
}

Tap.test('updates expected item with supplied attributes', test => {
	const list: Wizard[] = [
		{ id: '123', school_of_magic: 'fire' },
		{ id: '456', school_of_magic: 'water' },
		{ id: '789', school_of_magic: 'lightning' }
	];

	const updated_list = updateItemInList(list, '456', (item) => {
		return {
			...item,
			school_of_magic: 'fire'
		};
	});

	test.deepEqual(updated_list, [
		{ id: '123', school_of_magic: 'fire' },
		{ id: '456', school_of_magic: 'fire' },
		{ id: '789', school_of_magic: 'lightning' }
	]);
	test.end();
});
