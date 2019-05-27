interface UpdateItemCallback<T> {
	(item: T): T;
}

interface ItemWithId {
	id: string;
}

function updateItemInList<T extends ItemWithId>(
	list: Array<T>,
	id: string,
	callback: UpdateItemCallback<T>
) : Array<T> {
	return list.map(item => {
		if (item.id === id) {
			return callback(item);
		} else {
			return item;
		}
	});
}

export default updateItemInList;
