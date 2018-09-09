"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_builder_1 = require("../classes/ui-builder");
var base64_1 = require("../utils/base64");
var fs_extra_1 = require("../utils/fs-extra");
var RequestHandler = (function () {
    function RequestHandler(config) {
        this.config = config;
    }
    RequestHandler.prototype.isSuccess = function (res, next, payload) {
        res.status(200);
        if (payload) {
            res.send(payload);
        }
        res.end();
        next();
    };
    RequestHandler.prototype.onGetShow = function (req, res, next) {
        this.isSuccess(res, next, this.buildDiashowUi());
    };
    RequestHandler.prototype.onGetPictures = function (req, res, next) {
        var _this = this;
        var location = this.config.serverPicturesLocation + '/';
        fs_extra_1.listFiles(location)
            .then(function (pics) { return Promise.all(pics.map(function (pic) { return base64_1.toBase64(location + pic); })); })
            .then(function (encodedPics) { return _this.isSuccess(res, next, JSON.stringify(encodedPics)); });
    };
    RequestHandler.prototype.onGetConfig = function (req, res, next) {
        this.isSuccess(res, next, JSON.stringify(this.config));
    };
    RequestHandler.prototype.buildDiashowUi = function () {
        return ui_builder_1.UIBuilder.build(this.config)
            .html()
            .head()
            .jsTag()
            .jsCodeDiashow()
            .jsTag(true)
            .head(true)
            .bodyDiaShow()
            .html(true)
            .toString();
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=request-handler.js.map