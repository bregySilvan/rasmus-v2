"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request_handler_1 = require("../services/request-handler");
var CustomRouter = (function () {
    function CustomRouter(_app, config) {
        this._app = _app;
        this.config = config;
        this._app = _app;
        this._router = express.Router();
        this._requestHandler = new request_handler_1.RequestHandler(this.config);
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
    }
    Object.defineProperty(CustomRouter.prototype, "activeLocations", {
        get: function () {
            return this._activeLocations;
        },
        enumerable: true,
        configurable: true
    });
    CustomRouter.prototype._activateRoutes = function () {
        var locations = this.config.locations;
        this._addRoute(locations.pictures, 'get', this._requestHandler.onGetPictures);
        this._addRoute(locations.show, 'get', this._requestHandler.onGetShow);
        this._addRoute(locations.config, 'get', this._requestHandler.onGetConfig);
    };
    CustomRouter.prototype._addRoute = function (location, method, requestHandlerFn) {
        location = location.startsWith('/') ? location : "/" + location;
        this._activeLocations.push(method.toUpperCase() + ": " + location);
        this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    };
    return CustomRouter;
}());
exports.CustomRouter = CustomRouter;
//# sourceMappingURL=router.js.map