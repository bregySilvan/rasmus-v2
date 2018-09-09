"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("../utils/fs-extra");
var interval_service_1 = require("../services/interval-service");
var steinbock_job_1 = require("./job/steinbock-job");
var Setup = (function () {
    function Setup(config) {
        this.config = config;
        this.intervalService = new interval_service_1.IntervalService();
    }
    Setup.prototype.start = function () {
        this.clearServerPictures();
        this.copyCustomFiles();
        this.startImageJobs();
    };
    Setup.prototype.copyCustomFiles = function () {
        var srcFolder = this.config.customPicturesLocation;
        var destFolder = this.config.serverPicturesLocation;
        fs_extra_1.listFiles(srcFolder)
            .then(function (files) { return Promise.all(files.map(function (file) { return fs_extra_1.copyFile(srcFolder + "/" + file, destFolder + "/" + file); })); })
            .then(function () { return console.log('user files copied into server folder'); })
            .catch(function (err) { return console.error(err); });
    };
    Setup.prototype.clearServerPictures = function () {
        var target = this.config.serverPicturesLocation;
        if (fs_extra_1.existsSync(target)) {
            fs_extra_1.removeSync(target);
        }
        fs_extra_1.mkdirSync(target);
    };
    Setup.prototype.startImageJobs = function () {
        this.runSteinbockjobs();
    };
    Setup.prototype.runSteinbockjobs = function () {
        var bockJobs = [];
        for (var i = 0; i < this.config.steinbockJobCount; i++) {
            bockJobs.push(new steinbock_job_1.SteinbockJob(this.config));
        }
        this.intervalService.start(function () { return bockJobs.forEach(function (bockJob) { return bockJob.run(); }); }, this.config.reloadPicturesOnServerMs);
    };
    return Setup;
}());
exports.Setup = Setup;
//# sourceMappingURL=setup.js.map