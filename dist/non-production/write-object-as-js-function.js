"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("../utils/fs-extra");
function writeJsConfig() {
    var configPath = this.config.publicFilesLocation + this.config.publicConfigfileName;
    var contents = 'function config() { \n  return ';
    contents = this.writeObject(this.config, contents);
    contents += ';\n';
    fs_extra_1.writeFile(configPath, contents);
}
function writeObject(obj, contents, depth) {
    var _this = this;
    if (depth === void 0) { depth = ''; }
    var keys = Object.keys(this.config);
    var newDepth = depth + '  ';
    contents += ' {\n';
    keys.forEach(function (key, index) {
        var a;
        var val = obj[key];
        contents += "" + depth + key + ": ";
        console.log(typeof val);
        if (typeof val === 'object') {
            if (val[0]) {
                contents += '[';
                val.forEach(function (v) { return contents += JSON.stringify(val) + ","; });
                contents += ']';
            }
            else {
                contents += _this.writeObject(obj, contents, newDepth);
            }
        }
        else {
            contents += JSON.stringify(val);
        }
        if (index !== keys.length - 1)
            contents += ',\n';
    });
    contents += depth + '\n }';
    return contents;
}
//# sourceMappingURL=write-object-as-js-function.js.map