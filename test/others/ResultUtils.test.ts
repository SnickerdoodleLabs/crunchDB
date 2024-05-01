import { ResultAsync, errAsync, okAsync } from "neverthrow";
import { ResultUtils } from "neverthrow-result-utils";

describe("ResultUtils tests", () => {
	test("combine returns after each method completes", async () => {
		// Arrange
		let value = 0;
		function asyncMethod() {
			return okAsync<number, Error>(value++);
		}

		// Act
		const result = await ResultUtils.combine([
			asyncMethod(),
			asyncMethod(),
			asyncMethod(),
		]);

		// Assert
		expect(result.isErr()).toBeFalsy();
		const results = result._unsafeUnwrap();
		expect(results).toStrictEqual([0, 1, 2]);
		expect(value).toBe(3);
	});
});