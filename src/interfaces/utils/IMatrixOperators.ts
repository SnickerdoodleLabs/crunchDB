import { Matrix, Shape } from "crunchDB/objects";

export interface IMatrixOperators {
    shape(matrix: Matrix): Shape;
    shapeEqual(matrix1: Matrix, matrix2: Matrix): boolean;
    
    add(matrix1: Matrix, matrix2: Matrix): Matrix;
    subtract(matrix1: Matrix, matrix2: Matrix): Matrix;
    multiply(matrix1: Matrix, matrix2: Matrix): Matrix;
    transpose(matrix: Matrix): Matrix;
    inverse(matrix: Matrix): Matrix;
    determinant(matrix: Matrix): number;
    solve(matrix: Matrix, rhs: Matrix): Matrix;
    
    addScalar(matrix: Matrix, scalar: number): Matrix;
    subtractScalar(matrix: Matrix, scalar: number): Matrix;
    multiplyScalar(matrix: Matrix, scalar: number): Matrix;
    divideScalar(matrix: Matrix, scalar: number): Matrix;


}


export const IMatrixOperatorsType = Symbol.for("IMatrixOperators");
