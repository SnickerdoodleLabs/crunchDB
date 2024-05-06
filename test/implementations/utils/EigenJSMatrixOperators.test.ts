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
        const result = (await operators.add(matrix1, matrix2));

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual(expected);
        } else {
            fail("Matrix addition resulted in an error");
        }
        

    });
    test('shape', () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const expectedShape = [2, 2];
        const operators = m.factory();

        const result = operators.shape(matrix);
        expect(result).toEqual(expectedShape);
    });

    test('shapeEqual', () => {
        const m = new mocks();
        const matrix1 = [[1, 2], [3, 4]];
        const matrix2 = [[5, 6], [7, 8]];
        const operators = m.factory();
        expect(operators.shapeEqual(matrix1, matrix2)).toBe(true);
    });

    test('add', async () => {
        const m = new mocks();
        const matrix1 = [[1, 2], [3, 4]];
        const matrix2 = [[5, 6], [7, 8]];
        const operators = m.factory();
        const result = (await operators.add(matrix1, matrix2));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[6, 8], [10, 12]]);
        } else {
            fail('Matrix addition resulted in an error');
        }
    });

    test('subtract', async () => {
        const m = new mocks();
        const matrix1 = [[1, 2], [3, 4]];
        const matrix2 = [[5, 6], [7, 8]];
        const operators = m.factory();
        const result = (await operators.subtract(matrix1, matrix2));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[-4, -4], [-4, -4]]);
        } else {
            fail('Matrix subtraction resulted in an error');
        }
    });

    test('multiply', async () => {
        const m = new mocks();
        const matrix1 = [[1, 2], [3, 4]];
        const matrix2 = [[5, 6], [7, 8]];
        const operators = m.factory();
        const result = (await operators.multiply(matrix1, matrix2));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[19, 22], [43, 50]]);
        } else {
            fail('Matrix multiplication resulted in an error');
        }
    });

    test('transpose', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const operators = m.factory();
        const result = (await operators.transpose(matrix));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[1, 3], [2, 4]]);
        } else {
            fail('Matrix transpose resulted in an error');
        }
    });

    test('inverse', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const operators = m.factory();
        const result = (await operators.inverse(matrix));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            const value = result.value as number[][];
            expect(value[0][0]).toBeCloseTo(-2, 5);
            expect(value[0][1]).toBeCloseTo(1, 5);
            expect(value[1][0]).toBeCloseTo(1.5, 5);
            expect(value[1][1]).toBeCloseTo(-0.5, 5);
        } else {
            fail('Matrix inverse resulted in an error');
        }
    });

    test('determinant', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const operators = m.factory();
        const result = (await operators.determinant(matrix));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual(-2);
        } else {
            fail('Matrix determinant resulted in an error');
        }
    });

    // test('solve', async () => {
    //     const m = new mocks();
    //     const matrix = [[1, 2], [3, 4]];
    //     const rhs = [[5], [6]];
    //     const operators = m.factory();
    //     const result = (await operators.solve(matrix, rhs));
    //     expect(result.isOk()).toBe(true);
    //     if (result.isOk()) {
    //         expect(result.value).toEqual([[-4], [4.5]]);
    //     } else {
    //         fail('Matrix solve resulted in an error');
    //     }
    // });

    test('addScalar', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const scalar = 5;
        const operators = m.factory();
        const result = (await operators.addScalar(matrix, scalar));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[6, 7], [8, 9]]);
        } else {
            fail('Matrix addScalar resulted in an error');
        }
    });

    test('subtractScalar', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const scalar = 5;
        const operators = m.factory();
        const result = (await operators.subtractScalar(matrix, scalar));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[-4, -3], [-2, -1]]);
        } else {
            fail('Matrix subtractScalar resulted in an error');
        }
    });

    test('multiplyScalar', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const scalar = 5;
        const operators = m.factory();
        const result = (await operators.multiplyScalar(matrix, scalar));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[5, 10], [15, 20]]);
        } else {
            fail('Matrix multiplyScalar resulted in an error');
        }
    });

    test('divideScalar', async () => {
        const m = new mocks();
        const matrix = [[1, 2], [3, 4]];
        const scalar = 2;
        const operators = m.factory();
        const result = (await operators.divideScalar(matrix, scalar));
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
            expect(result.value).toEqual([[0.5, 1], [1.5, 2]]);
        } else {
            fail('Matrix divideScalar resulted in an error');
        }
    });
});