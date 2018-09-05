
import * as _ from 'lodash';
import { Server } from './classes/server';
import { DEFAULT_CONFIG } from './settings/default-config';
import { USER_CONFIG } from './config';

let config = _.merge(DEFAULT_CONFIG, USER_CONFIG);
new Server().start(config);
