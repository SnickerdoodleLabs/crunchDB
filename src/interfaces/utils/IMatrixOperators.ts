import { Matrix, MatrixErrors, Shape } from "crunchDB/objects";
import { ResultAsync } from "neverthrow";

export interface IMatrixOperators {
    shape(matrix: Matrix): Shape;
    shapeEqual(matrix1: Matrix, matrix2: Matrix): boolean;
    
    add(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors>;
    subtract(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors>;
    multiply(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors>;
    transpose(matrix: Matrix): ResultAsync<Matrix, MatrixErrors>;
    inverse(matrix: Matrix): ResultAsync<Matrix, MatrixErrors>;
    determinant(matrix: Matrix): ResultAsync<number, MatrixErrors>;
    solve(matrix: Matrix, rhs: Matrix): ResultAsync<Matrix, MatrixErrors>;
    
    addScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors>;
    subtractScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors>;
    multiplyScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors>;
    divideScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors>;


}


export const IMatrixOperatorsType = Symbol.for("IMatrixOperators");
