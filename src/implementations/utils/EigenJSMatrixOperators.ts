import { IMatrixOperators } from "crunchDB/interfaces";
import { Matrix, MatrixErrors, MatrixOperatorsError, Shape } from "crunchDB/objects";
import { IEigenJSUtils } from "crunchDB/interfaces/utils/IEigenJSUtils";
import { ResultAsync, errAsync } from "neverthrow";
import { ResultUtils } from "neverthrow-result-utils";
import eig from "eigen";

export class EigenJSMatrixOperators implements IMatrixOperators {
    public constructor(readonly eigenJSUtils: IEigenJSUtils) {

    }

    private wrapResultWithGCFlush(result: ResultAsync<Matrix, MatrixErrors>): ResultAsync<Matrix, MatrixErrors> {
        return result.map((matrix) => {
            eig.GC.flush();
            return matrix;
        });
    }

    public shape(matrix: Matrix): Shape {
        throw new Error("Method not implemented.");
    }
    public shapeEqual(matrix1: Matrix, matrix2: Matrix): boolean {
        // TODO implement
        return true;
    }
    public add(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors> {

        
        // TODO validate shape equality first. return error
        if (!this.shapeEqual(matrix1, matrix2)) {
            return errAsync(new MatrixOperatorsError("Shapes are not equal"));
        }
        const mat1Res = this.eigenJSUtils.fromJS(matrix1);
        const mat2Res = this.eigenJSUtils.fromJS(matrix2);

        // ResultUtils can wait on a list of promises and then combine the results into an array
        return ResultUtils.combine([mat1Res, mat2Res]).andThen(([mat1, mat2]) => {
            const sum = mat1.matAdd(mat2);
            // sum.print("sum");
            const jsResult = this.eigenJSUtils.toJS(sum);
            
            return this.wrapResultWithGCFlush(jsResult);
        });

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