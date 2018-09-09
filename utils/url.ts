import { IConfig } from '../settings/config.interface';

export function httpRequest(protocol: 'http' | 'https', address: string, port: number | string, location: string) {
    return `${protocol}://${address}:${port}${location}`
}

export function serverRequest(config: IConfig, location: string) {
    return httpRequest('http', config.serverAddress, config.serverPort, location);
}

export function toDomain(url: string) {
    let domainStartIndex = url.indexOf('://')+3;
    let domainEndIndex = url.indexOf('/', domainStartIndex);
    return url.substring(domainStartIndex, domainEndIndex);
}
