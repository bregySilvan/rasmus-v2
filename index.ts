import * as _ from 'lodash';
import { Server } from './classes/server';
import { SERVER_CONFIG } from './settings/server-config';
import { IConfig } from './settings/config.interface';
import { IUserConfig } from './user-config.interface';

export default function startServer(config: IUserConfig): Promise<Server> {
    let fullConfig: IConfig = _.merge(SERVER_CONFIG, config);
    return new Server().start(fullConfig);
}
