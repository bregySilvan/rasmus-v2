import { IUserConfig } from '../user-config.interface';

export interface ILocationMap {
    show: '/show';
    pictures: '/pictures';
}

export interface IServerConfig {
    locations: ILocationMap;
    pictureElementId: string;
    serverPicturesLocation: string;
    localAddress: string;
    port: number;
}


