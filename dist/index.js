"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var server_1 = require("./classes/server");
var server_config_1 = require("./settings/server-config");
var user_config_1 = require("./user-config");
function startServer(config) {
    var fullConfig = _.merge(server_config_1.SERVER_CONFIG, user_config_1.USER_CONFIG);
    return new server_1.Server().start(fullConfig);
}
exports.default = startServer;
//# sourceMappingURL=index.js.map