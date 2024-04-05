"use strict";
exports.__esModule = true;
exports.args = void 0;
var ts_command_line_args_1 = require("ts-command-line-args");
var MakeUtils_1 = require("./MakeUtils");
var makeUtils = new MakeUtils_1.MakeUtils();
var MakeType;
(function (MakeType) {
    MakeType["Error"] = "error";
    MakeType["Brand"] = "brand";
})(MakeType || (MakeType = {}));
exports.args = (0, ts_command_line_args_1.parse)({
    make: { type: String, alias: 'm', description: 'Type of make' },
    name: { type: String, alias: 'n', description: 'Copies files rather than moves them' },
    help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' }
}, {
    helpArg: 'help',
    headerContentSections: [{ header: 'My Example Config', content: 'Thanks for using Our Awesome Library' }],
    footerContentSections: [{ header: 'Footer', content: "Copyright: Big Faceless Corp. inc." }]
});
console.log(exports.args);
if (exports.args.make === MakeType.Error) {
    console.log('making error');
    makeUtils.makeError(exports.args.name).then(function (res) {
        if (res) {
            console.log('Error created');
        }
        else {
            console.log('Error already exists');
        }
    });
}
