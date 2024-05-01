import { IMatrixOperators } from "crunchDB/interfaces";
import { Matrix, Shape } from "crunchDB/objects";

export class EigenJSMatrixOperators implements IMatrixOperators {
    public shape(matrix: Matrix): Shape {
        throw new Error("Method not implemented.");
    }
    public shapeEqual(matrix1: Matrix, matrix2: Matrix): boolean {
        throw new Error("Method not implemented.");
    }
    public add(matrix1: Matrix, matrix2: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public subtract(matrix1: Matrix, matrix2: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public multiply(matrix1: Matrix, matrix2: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public transpose(matrix: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public inverse(matrix: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public determinant(matrix: Matrix): number {
        throw new Error("Method not implemented.");
    }
    public solve(matrix: Matrix, rhs: Matrix): Matrix {
        throw new Error("Method not implemented.");
    }
    public addScalar(matrix: Matrix, scalar: number): Matrix {
        throw new Error("Method not implemented.");
    }
    public subtractScalar(matrix: Matrix, scalar: number): Matrix {
        throw new Error("Method not implemented.");
    }
    public multiplyScalar(matrix: Matrix, scalar: number): Matrix {
        throw new Error("Method not implemented.");
    }
    public divideScalar(matrix: Matrix, scalar: number): Matrix {
        throw new Error("Method not implemented.");
    }
    
}