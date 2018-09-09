"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = require("../utils/id");
var INFINITE_EXECUTIONS = -1;
var IntervalService = (function () {
    function IntervalService() {
        this.jobs = {};
    }
    IntervalService.prototype.start = function (fn, interval, executions) {
        if (executions === void 0) { executions = INFINITE_EXECUTIONS; }
        var job;
        if (executions > 0) {
            job = setInterval(function () { return --executions < 1 ? clearInterval(job) : fn(); }, interval);
        }
        else {
            job = setInterval(function () { return fn(); }, interval);
        }
        return this.saveJob(job);
    };
    IntervalService.prototype.stop = function (id) {
        var job = this.jobs[id];
        if (job) {
            clearInterval(job);
            this.jobs[id] = undefined;
        }
    };
    IntervalService.prototype.saveJob = function (job) {
        var id = id_1.createId();
        this.jobs[id] = job;
        return id;
    };
    return IntervalService;
}());
exports.IntervalService = IntervalService;
//# sourceMappingURL=interval-service.js.map