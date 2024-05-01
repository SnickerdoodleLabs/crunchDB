import { IEigenJSUtils } from "crunchDB/interfaces";
import { EigenJSNotReadyError, Matrix, Vector } from "crunchDB/objects";
import eig from "eigen";
import { ResultAsync, okAsync } from "neverthrow";

export class EigenJSUtils implements IEigenJSUtils {
    private isReady = false;
    public ready() : ResultAsync<void, EigenJSNotReadyError> {
        if (this.isReady) {
            return okAsync(undefined);
        } else {
            return ResultAsync.fromPromise(eig.ready, () => new EigenJSNotReadyError("Eigen-js is not ready"));
        }
    }
    public toJS(matrix: eig.Matrix): ResultAsync<Matrix, EigenJSNotReadyError>{
        return this.ready().andThen(() => {
            return okAsync(this.toJSSync(matrix));
        });
    }

    public toRowVector(matrix: eig.Matrix): ResultAsync<Vector, EigenJSNotReadyError> {
        return this.ready().andThen(() => {
            return okAsync(this.toRowVectorSync(matrix));
        });
    }

    public fromJS(matrix: Matrix): ResultAsync<eig.Matrix, EigenJSNotReadyError> {
        return this.ready().andThen(() => {
            return okAsync(this.fromJSSync(matrix));
        });

    }
    private toJSSync(matrix: eig.Matrix): Matrix {
        
        if (matrix.rows() === 1) {
            return this.toRowVectorSync(matrix);
        } else {
            let rows = [];
            for (let i = 0; i < matrix.rows(); i++) {
                let row = [];
                for (let j = 0; j < matrix.cols(); j++) {
                    row.push(matrix.get(i, j));
                }
                rows.push(row);
            }
            return rows;
        }
    }
    private toRowVectorSync(matrix: eig.Matrix): Vector {
        
        let row = [];
        for (let j = 0; j < matrix.cols(); j++) {
            row.push(matrix.get(0, j));
        }
        return row;
        
    }
    private fromJSSync(matrix: Matrix): eig.Matrix {
        // two issues with eigen-js:
        // cannot convert a row vector to a matrix [1, 1] will become a 2x1 matrix

        if (Array.isArray(matrix[0])) {
            return new eig.Matrix(matrix as number[][]);
        } else {
            return new eig.Matrix([matrix as number[]]);
        }

    }
}