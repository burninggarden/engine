import updateItem from 'utilities/update-item';

interface Wizard {
	familiar        : string;
	school_of_magic : string;
}

describe('updateItem', () => {
	it('returns item with expected attributes', () => {
		const wizard: Wizard = {
			familiar:        'owl',
			school_of_magic: 'fire'
		};

		const updated_wizard = updateItem(wizard, {
			school_of_magic: 'ice'
		});

		expect(updated_wizard).toEqual({
			familiar:        'owl',
			school_of_magic: 'ice'
		});
	});
});
