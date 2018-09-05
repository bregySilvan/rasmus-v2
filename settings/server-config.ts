import { IServerConfig } from './server-config.interface';

export const SERVER_CONFIG: IServerConfig = {
    locations: {
        show: '/show',
        pictures: '/pictures'
    },
    localAddress: '192.168.1.254',
    port: 5001,
    serverPicturesLocation: './pictures'
};
