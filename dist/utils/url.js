"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpRequest(protocol, address, port, location) {
    location = location.startsWith('/') ? location : "/" + location;
    return protocol + "://" + address + ":" + port + location;
}
exports.httpRequest = httpRequest;
function serverRequest(config, location) {
    return httpRequest('http', config.serverAddress, config.serverPort, location);
}
exports.serverRequest = serverRequest;
function toDomain(url) {
    var domainStartIndex = url.indexOf('://') + 3;
    var domainEndIndex = url.indexOf('/', domainStartIndex);
    return url.substring(domainStartIndex, domainEndIndex);
}
exports.toDomain = toDomain;
//# sourceMappingURL=url.js.map