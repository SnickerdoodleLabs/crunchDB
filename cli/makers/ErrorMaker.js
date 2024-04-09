"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ErrorMaker = void 0;
var FileUtils_1 = require("../FileUtils");
var codeTemplates_1 = require("./codeTemplates");
var errorCodes_1 = require("../../src/objects/error/errorCodes");
var neverthrow_1 = require("neverthrow");
var ErrorMaker = /** @class */ (function () {
    function ErrorMaker() {
        this.errorDirectory = 'src/objects/error/';
    }
    ErrorMaker.prototype.makeError = function (name) {
        var _this = this;
        return this.noExists(name)
            .andThen(function (e) {
            // console.log('Error does not exist');
            return FileUtils_1.FileUtils.writeFile(_this.errorPath(name), _this.errorTemplate(name))
                .andThen(function () {
                return _this.addErrorType(name)
                    .andThen(function () {
                    return _this.addToIndex(name);
                })
                    .mapErr(function (e) {
                    return new Error("Error adding to index. Please add ".concat(name, " to ").concat(_this.errorIndexPath(), " manually."));
                });
            });
        }).mapErr(function (e) {
            // console.log('Error exists', e);
            return new Error("Error already exists");
        });
    };
    ErrorMaker.prototype.noExists = function (name) {
        return FileUtils_1.FileUtils.notExists(this.errorPath(name));
    };
    ErrorMaker.prototype.errorPath = function (name) {
        return this.errorDirectory + name + '.ts';
    };
    ErrorMaker.prototype.errorCodePath = function () {
        return this.errorDirectory + "errorCodes" + '.ts';
    };
    ErrorMaker.prototype.errorIndexPath = function () {
        return this.errorDirectory + 'index.ts';
    };
    ErrorMaker.prototype.errorTemplate = function (name) {
        return codeTemplates_1.errorTemplate.replace(new RegExp('@@@name@@@', 'g'), name);
    };
    ErrorMaker.prototype.addErrorType = function (name) {
        var _a;
        var newErrorCodes = __assign(__assign({}, errorCodes_1["default"]), (_a = {}, _a[name] = "ERR_".concat(name), _a));
        var strBuff = [];
        for (var key in newErrorCodes) {
            strBuff.push("    ".concat(key, ": \"").concat(newErrorCodes[key], "\","));
        }
        var body = strBuff.join('\n');
        var content = codeTemplates_1.errorCodesTemplate.replace(new RegExp('@@@errorCodes@@@', 'g'), body);
        console.log(content);
        return FileUtils_1.FileUtils.writeFile(this.errorCodePath(), content);
    };
    ErrorMaker.prototype.addToIndex = function (name) {
        var _this = this;
        // check if the class exists in the index file
        var classRelativePath = "./".concat(name);
        return FileUtils_1.FileUtils.readFile(this.errorIndexPath())
            .andThen(function (content) {
            if (content.includes("export {}")) {
                content = ""; // reset
            }
            if (content.includes(classRelativePath)) {
                return (0, neverthrow_1.okAsync)(undefined);
            }
            else {
                content += "export * from '".concat(classRelativePath, "';\n");
                return FileUtils_1.FileUtils.writeFile(_this.errorIndexPath(), content);
            }
        });
    };
    ErrorMaker.prototype.cleanUpErrorCodesCompiled = function () {
        // return FileUtils.exists(this.errorCodePath(name));
        return Promise.resolve(true); // TODO
    };
    return ErrorMaker;
}());
exports.ErrorMaker = ErrorMaker;
