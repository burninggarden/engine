
function updateItem<T>(item: T, attributes: Partial<T>) : T {
	return {
		...item,
		...attributes
	} as T;
}

export default updateItem;
