import { IUserConfig } from '../user-config.interface';

export interface ILocationMap {
    show: '/show';
    pictures: '/pictures';
}

export interface IServerConfig {
    locations: ILocationMap;
    serverPicturesLocation: string;
    localAddress: string;
    port: number;
}


