import updateItemInList from 'utilities/update-item-in-list';

interface Wizard {
	id              : string;
	school_of_magic : string;
}

describe('updateItemInList', () => {
	it('updates expected item with supplied attributes', () => {
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

		expect(updated_list).toEqual([
			{ id: '123', school_of_magic: 'fire' },
			{ id: '456', school_of_magic: 'fire' },
			{ id: '789', school_of_magic: 'lightning' }
		]);
	});
});
