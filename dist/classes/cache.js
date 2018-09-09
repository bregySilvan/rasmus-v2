"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = (function () {
    function Cache() {
    }
    Cache.has = function (key) {
        return !!Cache.cache[key];
    };
    Cache.put = function (key, value) {
        Cache.cache[key] = value;
        this.setCleaner(key);
    };
    Cache.get = function (key) {
        return Cache.cache[key];
    };
    Cache.remove = function (key) {
        if (Cache.cleaner[key]) {
            clearTimeout(Cache.cleaner[key]);
            Cache.cache[key] = undefined;
        }
    };
    Cache.setCleaner = function (key) {
        if (Cache.cleaner[key]) {
            clearTimeout(Cache.cleaner[key]);
        }
        Cache.cleaner[key] = setTimeout(function () {
            Cache.cache[key] = undefined;
            Cache.cleaner[key] = undefined;
        }, Cache.DEFAULT_CLEAN_TIMEOUT);
    };
    Cache.DEFAULT_CLEAN_TIMEOUT = 8 * 60 * 1000;
    Cache.cache = {};
    Cache.cleaner = {};
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map