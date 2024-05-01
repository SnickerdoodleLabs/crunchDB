import { EigenJSUtils, EigenJSMatrixOperators } from "crunchDB/implementations";

class mocks {
    public eigenJSUtils = new EigenJSUtils();
    public factory(): EigenJSMatrixOperators {
        return new EigenJSMatrixOperators(this.eigenJSUtils);
    }
}

describe("EigenJSMatrixOperators", () => {
    it("should add two matrices", async () => {
        // Arrange
        const m = new mocks();
        const matrix1 = [[1, 2], [3, 4]];
        const matrix2 = [[5, 6], [7, 8]];
        const expected = [[6, 8], [10, 12]];
        const operators = m.factory();

        // Act
        const result = (await operators.add(matrix1, matrix2))._unsafeUnwrap();

        // Assert
        expect(result).toEqual(expected);
        

    });
});
