"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ip = require("ip");
exports.SERVER_CONFIG = {
    locations: {
        show: '/show',
        pictures: '/pictures',
        config: '/config',
        settings: '/settings'
    },
    serverAddress: ip.address(),
    serverPort: 5001,
    serverPicturesLocation: './pictures',
    pictureElementId: 'picture',
    showStartDelay: 4000,
    reloadPicturesOnClientMs: 60 * 1000,
    reloadPicturesOnServerMs: 3 * 60 * 1000
};
//# sourceMappingURL=server-config.js.map