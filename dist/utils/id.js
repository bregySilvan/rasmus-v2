"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createId() {
    var now = '' + Date.now();
    var timePart = now.substring(now.length - 5);
    return timePart + Math.random().toString(36).substring(2);
}
exports.createId = createId;
//# sourceMappingURL=id.js.map