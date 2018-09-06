import { IServerConfig } from './server-config.interface';

export const SERVER_CONFIG: IServerConfig = {
    locations: {
        show: '/show',
        pictures: '/pictures',
        config: '/config'
    },
    localAddress: '192.168.1.254',
    port: 5001,
    serverPicturesLocation: './pictures',
    pictureElementId: 'picture',
    publicFilesLocation: 'public/',
    showStartDelay: 3000
};
