import { IUserConfig } from '../user-config.interface';

export interface ILocationMap {
    show: '/show';
    pictures: '/pictures';
    config: '/config'
}

export interface IServerConfig {
    locations: ILocationMap;
    pictureElementId: string;
    serverPicturesLocation: string;
    serverAddress: string;
    serverPort: number;
    showStartDelay: number;
    reloadPictureTimeMs: number;
}


