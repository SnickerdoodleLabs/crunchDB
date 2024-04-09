"use strict";
exports.__esModule = true;
exports.FileUtils = void 0;
var fs = require("node:fs/promises");
var FileUtils = /** @class */ (function () {
    function FileUtils() {
    }
    FileUtils.exists = function (path) {
        return fs.access(path)
            .then(function () { return true; })["catch"](function () { return false; });
    };
    FileUtils.writeFile = function (path, content) {
        return fs.writeFile(path, content)
            .then(function () { return true; })["catch"](function () { return false; });
    };
    FileUtils.readFile = function (path) {
        return fs.readFile(path, 'utf-8');
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
