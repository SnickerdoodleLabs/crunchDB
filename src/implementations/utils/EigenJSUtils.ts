import { IEigenJSUtils } from "crunchDB/interfaces";
import { Matrix, Vector } from "crunchDB/objects";
import eig from "eigen";
import { ResultAsync, okAsync } from "neverthrow";

export class EigenJSUtils implements IEigenJSUtils {
    public toJS(matrix: eig.Matrix): ResultAsync<Matrix | Vector, never>{
        return okAsync(this.toJSSync(matrix));
    }

    public toRowVector(matrix: eig.Matrix): ResultAsync<Vector, never> {
        return okAsync(this.toRowVectorSync(matrix));
    }

    public fromJS(matrix: Matrix | Vector): ResultAsync<eig.Matrix, never> {
        return okAsync(this.fromJSSync(matrix));

    }
    public toJSSync(matrix: eig.Matrix): Matrix | Vector {
        
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
    public toRowVectorSync(matrix: eig.Matrix): Vector {
        
        let row = [];
        for (let j = 0; j < matrix.cols(); j++) {
            row.push(matrix.get(0, j));
        }
        return row;
        
    }
    public fromJSSync(matrix: Matrix | Vector): eig.Matrix {
        // two issues with eigen-js:
        // cannot convert a row vector to a matrix [1, 1] will become a 2x1 matrix

        if (Array.isArray(matrix[0])) {
            return new eig.Matrix(matrix as number[][]);
        } else {
            return new eig.Matrix([matrix as number[]]);
        }

    }
}