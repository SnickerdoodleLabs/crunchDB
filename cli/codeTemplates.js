"use strict";
exports.__esModule = true;
exports.errorCodesTemplate = exports.errorTemplate = void 0;
var errorTemplate = "import { BaseError } from \"./BaseError\";\nimport errorCodes from \"./errorCodes\";\n\nexport class @@@name@@@ extends BaseError {\n    protected errorCode: string = errorCodes[@@@name@@@.name];\n    constructor(\n      message: string,\n      public src?: unknown,\n    ) {\n      super(message, errorCodes[@@@name@@@.name], src);\n    }\n}";
exports.errorTemplate = errorTemplate;
var errorCodesTemplate = "const errorCodes: {[Key: string]: string} = {\n    @@@errorCodes@@@\n}\nexport default errorCodes;";
exports.errorCodesTemplate = errorCodesTemplate;
