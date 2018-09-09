"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var job_1 = require("./job");
var regex_1 = require("../../utils/regex");
var SteinbockJob = (function (_super) {
    __extends(SteinbockJob, _super);
    function SteinbockJob(config, url) {
        if (url === void 0) { url = 'https://www.steinbock77.ch/kameras/index.php'; }
        var _this = _super.call(this, config, url) || this;
        _this.steinbockPictureUrl = regex_1.REG_EXP.steinbockPictureUrl;
        return _this;
    }
    SteinbockJob.prototype.parseUrls = function (body) {
        var _this = this;
        return body.match(this.steinbockPictureUrl)
            .map(function (url) { return "https://" + _this.domain + url.replace('..', ''); });
    };
    return SteinbockJob;
}(job_1.Job));
exports.SteinbockJob = SteinbockJob;
//# sourceMappingURL=steinbock-job.js.map