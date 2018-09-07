import * as _ from 'lodash';
import { Server } from './classes/server';
import { SERVER_CONFIG } from './settings/server-config';
import { USER_CONFIG } from './user-config';
import { IConfig } from './settings/config.interface';

let config: IConfig = _.merge(SERVER_CONFIG, USER_CONFIG);

new Server().start(config);
