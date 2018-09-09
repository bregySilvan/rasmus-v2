"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../client/functions");
var _ = require("lodash");
var UIBuilder = (function () {
    function UIBuilder(config) {
        this.config = config;
        this.contents = '';
        this.functions = functions_1.PLAIN_JS_FUNCTIONS_UI;
    }
    UIBuilder.build = function (config) {
        return new UIBuilder(config);
    };
    UIBuilder.prototype.html = function (isClosingTag) {
        if (isClosingTag === void 0) { isClosingTag = false; }
        return this.appendTag('html', isClosingTag);
    };
    UIBuilder.prototype.head = function (isClosingTag) {
        if (isClosingTag === void 0) { isClosingTag = false; }
        return this.appendTag('head', isClosingTag);
    };
    UIBuilder.prototype.bodyDiaShow = function () {
        this.appendTag('body', false);
        this.appendTag('canvas', false, { id: this.config.pictureElementId });
        this.appendTag('canvas', true);
        return this.appendTag('body', true);
    };
    UIBuilder.prototype.bodySettings = function () {
        return this;
    };
    UIBuilder.prototype.jsTag = function (isClosingTag) {
        if (isClosingTag === void 0) { isClosingTag = false; }
        return this.appendTag('script', isClosingTag);
    };
    UIBuilder.prototype.jsCodeDiashow = function () {
        var _this = this;
        this.append('var images = [];\n');
        this.append('var currentIndex = 0;\n');
        this.append('var isLoading = false;\n');
        this.append("var config = {\n\n            serverAddress: \"" + this.config.serverAddress + "\",\n\n            serverPort: " + this.config.serverPort + ",\n\n            locations: { config: '/config' }\n\n        };\n");
        this.appendAll(_.functions(this.functions)
            .map(function (f) { return _this.sanitiseFunction('' + _this.functions[f], f); }));
        return this.append("setTimeout(function() { startShow(); }, " + this.config.showStartDelay + ");");
    };
    UIBuilder.prototype.jsCodeSettings = function () {
        return this;
    };
    UIBuilder.prototype.toString = function () {
        return this.contents;
    };
    UIBuilder.prototype.append = function (text) {
        this.contents += text;
        return this;
    };
    UIBuilder.prototype.appendAll = function (data) {
        var _this = this;
        data.forEach(function (d) { return _this.append(d); });
        return this;
    };
    UIBuilder.prototype.appendTag = function (tagName, isClosingTag, propertys) {
        if (propertys === void 0) { propertys = {}; }
        var fullStartTag;
        if (!isClosingTag) {
            fullStartTag = '<' + tagName;
            Object.keys(propertys).forEach(function (key) { return fullStartTag += " " + key + "=\"" + propertys[key] + "\""; });
        }
        else {
            fullStartTag = '</' + tagName;
        }
        return this.append(fullStartTag + '>');
    };
    UIBuilder.prototype.sanitiseFunction = function (func, name) {
        var plainFunctionBody = func.substring(func.indexOf('('));
        return 'function ' + name + plainFunctionBody;
    };
    return UIBuilder;
}());
exports.UIBuilder = UIBuilder;
//# sourceMappingURL=ui-builder.js.map