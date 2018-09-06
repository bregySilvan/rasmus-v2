import { IServerConfig } from './server-config.interface';

export const SERVER_CONFIG: IServerConfig = {
    locations: {
        show: '/show',
        pictures: '/pictures',
        config: '/config'
    },
    serverAddress: '192.168.1.254',
    serverPort: 5001,
    serverPicturesLocation: './pictures',
    pictureElementId: 'picture',
    showStartDelay: 1500,
    reloadPictureTimeMs: 12 * 1000
};
