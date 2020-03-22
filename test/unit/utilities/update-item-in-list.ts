import updateItemInList from "utilities/update-item-in-list";

interface Wizard {
	id: string;
	schoolOfMagic: string;
}

describe("updateItemInList", () => {
	it("updates expected item with supplied attributes", () => {
		const list: Wizard[] = [
			{ id: "123", schoolOfMagic: "fire" },
			{ id: "456", schoolOfMagic: "water" },
			{ id: "789", schoolOfMagic: "lightning" },
		];

		const updatedList = updateItemInList(list, "456", (item) => {
			return {
				...item,
				schoolOfMagic: "fire",
			};
		});

		expect(updatedList).toEqual([
			{ id: "123", schoolOfMagic: "fire" },
			{ id: "456", schoolOfMagic: "fire" },
			{ id: "789", schoolOfMagic: "lightning" },
		]);
	});
});
