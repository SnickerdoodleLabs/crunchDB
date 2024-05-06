import { EigenJSNotReadyError, Matrix, Vector } from "crunchDB/objects";
import eig from "eigen";
import { ResultAsync } from "neverthrow";


/*
Utils for eigen-js library.
*/
export interface IEigenJSUtils {
    ready() : ResultAsync<void, EigenJSNotReadyError>;
    toJS(matrix: eig.Matrix): ResultAsync<Matrix, EigenJSNotReadyError>;
    toRowVector(matrix: eig.Matrix): ResultAsync<Vector, EigenJSNotReadyError>;
    fromJS(matrix: Matrix): ResultAsync<eig.Matrix, EigenJSNotReadyError>;

    // toJSSync(matrix: eig.Matrix): Matrix;
    // toRowVectorSync(matrix: eig.Matrix): Vector;
    // fromJSSync(matrix: Matrix): eig.Matrix;
}


export const IEigenJSUtilsType = Symbol.for("IEigenJSUtils");