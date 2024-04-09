"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FileUtils = void 0;
var fs = require("node:fs/promises");
var neverthrow_1 = require("neverthrow");
var FileUtils = /** @class */ (function () {
    function FileUtils() {
    }
    FileUtils.exists = function (path) {
        return neverthrow_1.ResultAsync.fromPromise(fs.stat(path).then(function (stat) {
            if (stat.isFile()) {
                console.log('File exists');
                return Promise.resolve();
            }
            else {
                console.log('File does not exist');
                return Promise.reject(new Error('Not a file'));
            }
        }), function (e) { return new Error("Error checking file: ".concat(e)); });
    };
    FileUtils._notExists = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var notExists, stat, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notExists = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.stat(path)];
                    case 2:
                        stat = _a.sent();
                        if (stat.isFile() || stat.isDirectory()) {
                            notExists = false;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (notExists) {
                            return [2 /*return*/, true];
                        }
                        throw new Error('File exists');
                }
            });
        });
    };
    FileUtils.notExists = function (path) {
        return neverthrow_1.ResultAsync.fromPromise(this._notExists(path).then(function (res) { }), function (e) { return new Error("".concat(e)); });
    };
    FileUtils.writeFile = function (path, content) {
        return neverthrow_1.ResultAsync.fromPromise(fs.writeFile(path, content), function (e) { return new Error("Error writing file: ".concat(e)); });
    };
    FileUtils.readFile = function (path) {
        return neverthrow_1.ResultAsync.fromPromise(fs.readFile(path, 'utf-8'), function (e) { return new Error("Error reading file: ".concat(e)); });
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
