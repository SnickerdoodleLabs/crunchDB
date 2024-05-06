import { IMatrixOperators } from "crunchDB/interfaces";
import { Vector, Matrix, MatrixErrors, MatrixOperatorsError, Shape } from "crunchDB/objects";
import { IEigenJSUtils } from "crunchDB/interfaces/utils/IEigenJSUtils";
import { ResultAsync, errAsync } from "neverthrow";
import { ResultUtils } from "neverthrow-result-utils";
import eig from "eigen";
import _ from "lodash";

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
        if (Array.isArray(matrix[0])) {
            // 2D matrix
            return [matrix.length, (matrix[0] as Vector).length];
        } else {
            // 1D matrix
            return [matrix.length];
        }
    }

    public shapeEqual(matrix1: Matrix, matrix2: Matrix): boolean {
        const shape1 = this.shape(matrix1);
        const shape2 = this.shape(matrix2);
        return _.isEqual(shape1, shape2);
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

    public subtract(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors> {
        if (!this.shapeEqual(matrix1, matrix2)) {
            return errAsync(new MatrixOperatorsError("Shapes are not equal"));
        }
        const mat1Res = this.eigenJSUtils.fromJS(matrix1);
        const mat2Res = this.eigenJSUtils.fromJS(matrix2);

        return ResultUtils.combine([mat1Res, mat2Res]).andThen(([mat1, mat2]: [eig.Matrix, eig.Matrix]) => {
            const diff = mat1.matSub(mat2);
            const jsResult = this.eigenJSUtils.toJS(diff);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public multiply(matrix1: Matrix, matrix2: Matrix): ResultAsync<Matrix, MatrixErrors> {
        if (this.shape(matrix1)[1] !== this.shape(matrix2)[0]) {
            return errAsync(new MatrixOperatorsError("The number of columns in the first matrix must be equal to the number of rows in the second matrix"));
        }
        const mat1Res = this.eigenJSUtils.fromJS(matrix1);
        const mat2Res = this.eigenJSUtils.fromJS(matrix2);

        return ResultUtils.combine([mat1Res, mat2Res]).andThen(([mat1, mat2]: [eig.Matrix, eig.Matrix]) => {
            const product = mat1.matMul(mat2);
            const jsResult = this.eigenJSUtils.toJS(product);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public transpose(matrix: Matrix): ResultAsync<Matrix, MatrixErrors> {
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat) => {
            const transposed = mat.transpose();
            const jsResult = this.eigenJSUtils.toJS(transposed);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public inverse(matrix: Matrix): ResultAsync<Matrix, MatrixErrors> {
        if (this.shape(matrix)[0] !== this.shape(matrix)[1]) {
            return errAsync(new MatrixOperatorsError("Matrix must be square"));
        }
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat: eig.Matrix) => {
            if (mat.det() === 0) {
                return errAsync(new MatrixOperatorsError("Matrix is singular and cannot be inverted"));
            }
            const inversed = mat.inverse();
            const jsResult = this.eigenJSUtils.toJS(inversed);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public determinant(matrix: Matrix): ResultAsync<number, MatrixErrors> {
        if (this.shape(matrix)[0] !== this.shape(matrix)[1]) {
            return errAsync(new MatrixOperatorsError("Matrix must be square"));
        }
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.map((mat: eig.Matrix) => mat.det());
    }

    public solve(matrix: Matrix, rhs: Matrix): ResultAsync<Matrix, MatrixErrors> {
        if (this.shape(matrix)[0] !== this.shape(matrix)[1]) {
            return errAsync(new MatrixOperatorsError("Matrix must be square"));
        }
        const matRes = this.eigenJSUtils.fromJS(matrix);
        const rhsRes = this.eigenJSUtils.fromJS(rhs);

        return ResultUtils.combine([matRes, rhsRes]).andThen(([mat, rhs]: [eig.Matrix, eig.Matrix]) => {
            throw new Error("Method not implemented.");
            // const decomposition = eig.Decompositions.lu(mat);
            // const solution = decomposition.solve(rhs); // "solve" is not implemented in the EigenJS library
            // const jsResult = this.eigenJSUtils.toJS(solution);
            
            // return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public addScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors> {
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat) => {
            const scalarMat = eig.Matrix.constant(mat.rows(), mat.cols(), scalar);
            const result = mat.matAdd(scalarMat);
            const jsResult = this.eigenJSUtils.toJS(result);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public subtractScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors> {
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat) => {
            const scalarMat = eig.Matrix.constant(mat.rows(), mat.cols(), scalar);
            const result = mat.matSub(scalarMat);
            const jsResult = this.eigenJSUtils.toJS(result);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public multiplyScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors> {
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat) => {
            const result = mat.mul(scalar);
            const jsResult = this.eigenJSUtils.toJS(result);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }

    public divideScalar(matrix: Matrix, scalar: number): ResultAsync<Matrix, MatrixErrors> {
        if (scalar === 0) {
            return errAsync(new MatrixOperatorsError("Cannot divide by zero"));
        }
        const matRes = this.eigenJSUtils.fromJS(matrix);

        return matRes.andThen((mat) => {
            const result = mat.div(scalar);
            const jsResult = this.eigenJSUtils.toJS(result);
            
            return this.wrapResultWithGCFlush(jsResult);
        });
    }
}