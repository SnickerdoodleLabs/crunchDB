import { EigenJSNotReadyError } from "./EigenJSNotReadyError";
import { MatrixOperatorsError } from "./MatrixOperatorsError";

export type MatrixErrors = MatrixOperatorsError | EigenJSNotReadyError;