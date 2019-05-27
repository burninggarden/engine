
function selectRandom<T>(array: Array<T>) : T | undefined {
	const index = Math.floor(Math.random() * array.length);

	return array[index];
}

export default selectRandom;
