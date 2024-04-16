const errorTemplate = `import { BaseError } from "./BaseError";
import errorCodes from "./errorCodes";

export class @@@name@@@ extends BaseError {
    protected errorCode: string = errorCodes[@@@name@@@.name];
    constructor(
      message: string,
      public src?: unknown,
    ) {
      super(message, errorCodes[@@@name@@@.name], src);
    }
}`;

const errorCodesTemplate = `const errorCodes: {[Key: string]: string} = {
    @@@errorCodes@@@
}
export default errorCodes;`;

const brandTemplate = `import { Brand, make } from "ts-brand";
export type @@@name@@@ = Brand<@@@type@@@, "@@@name@@@">;
export const @@@name@@@ = make<@@@name@@@>();
`;

export { errorTemplate, errorCodesTemplate, brandTemplate };