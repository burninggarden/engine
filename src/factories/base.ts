import Faker from "faker";

abstract class BaseFactory<T> {
	public createInstances(): Array<T> {
		let count = Faker.random.number({
			min: this.getMinimumNumberOfInstances(),
			max: this.getMaximumNumberOfInstances(),
		});

		const results = [];

		while (count--) {
			results.push(this.createInstance());
		}

		return results;
	}

	private getMinimumNumberOfInstances(): number {
		return 0;
	}

	private getMaximumNumberOfInstances(): number {
		return 10;
	}

	public abstract createInstance(attributes?: Partial<T>): T;
}

export default BaseFactory;
