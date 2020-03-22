import updateItem from "utilities/update-item";

interface Wizard {
	familiar: string;
	schoolOfMagic: string;
}

describe("updateItem", () => {
	it("returns item with expected attributes", () => {
		const wizard: Wizard = {
			familiar: "owl",
			schoolOfMagic: "fire",
		};

		const updatedWizard = updateItem(wizard, {
			schoolOfMagic: "ice",
		});

		expect(updatedWizard).toEqual({
			familiar: "owl",
			schoolOfMagic: "ice",
		});
	});
});
