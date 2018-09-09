"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueueService = (function () {
    function QueueService() {
        this.queue = [];
        this.isActive = false;
    }
    QueueService.prototype.addToQueue = function (fn) {
        this.queue.push(fn);
        this._startQueue();
    };
    QueueService.prototype._startQueue = function () {
        if (!this.isActive && this.queue.length) {
            this.isActive = true;
            this._next();
        }
    };
    QueueService.prototype._next = function () {
        var _this = this;
        if (!this.queue.length) {
            this.isActive = false;
            return;
        }
        this.queue.shift()(function () {
            _this._next();
        });
    };
    return QueueService;
}());
exports.QueueService = QueueService;
//# sourceMappingURL=queue-service.js.map