
function updateItem<T extends object>(item: T, attributes: Partial<T>) : T {
	return {
		...(item as object),
		...(attributes as object)
	} as T;
}

export default updateItem;
