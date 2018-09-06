import { IConfig } from '../settings/config.interface';

export function httpRequest(protocol: 'http' | 'https', address: string, port: number | string, location: string) {
    location = location.startsWith('/') ? location : `/${location}`;
    return `${protocol}://${address}:${port}${location}`
}

export function serverRequest(config: IConfig, location: string) {
    return httpRequest('http', config.serverAddress, config.port, location);
}