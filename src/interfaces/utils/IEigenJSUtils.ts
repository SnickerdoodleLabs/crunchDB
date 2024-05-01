import { Matrix, Vector } from "crunchDB/objects";
import eig from "eigen";
import { ResultAsync } from "neverthrow";


/*
Utils for eigen-js library.
*/
export interface IEigenJSUtils {
    toJS(matrix: eig.Matrix): ResultAsync<Matrix | Vector, never>;
    toRowVector(matrix: eig.Matrix): ResultAsync<Vector, never>;
    fromJS(matrix: Matrix | Vector): ResultAsync<eig.Matrix, never>;

    toJSSync(matrix: eig.Matrix): Matrix | Vector;
    toRowVectorSync(matrix: eig.Matrix): Vector;
    fromJSSync(matrix: Matrix | Vector): eig.Matrix;
}


export const IEigenJSUtilsType = Symbol.for("IEigenJSUtils");