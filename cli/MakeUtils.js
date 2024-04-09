"use strict";
exports.__esModule = true;
exports.MakeUtils = void 0;
var makers_1 = require("./makers");
var MakeUtils = /** @class */ (function () {
    function MakeUtils() {
        this.errorMaker = new makers_1.ErrorMaker();
    }
    MakeUtils.prototype.makeError = function (name) {
        return this.errorMaker.makeError(name);
    };
    return MakeUtils;
}());
exports.MakeUtils = MakeUtils;
