import { IServerConfig } from './server-config.interface';
import * as ip from 'ip';

export const SERVER_CONFIG: IServerConfig = {
    locations: {
        show: '/show',
        pictures: '/pictures',
        config: '/config'
    },
    serverAddress: ip.address(),
    serverPort: 5001,
    serverPicturesLocation: './pictures',
    pictureElementId: 'picture',
    showStartDelay: 1500,
    reloadPictureTimeMs: 12 * 1000,
};
