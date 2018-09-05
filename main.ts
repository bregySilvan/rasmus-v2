
import * as _ from 'lodash';
import { Server } from './classes/server';
import { DEFAULT_CONFIG } from './settings/default-config';
import { USER_CONFIG } from './user-config';
import { SERVER_CONFIG } from './settings/server-config';

let config = _.merge(DEFAULT_CONFIG, USER_CONFIG);

new Server().start(config);


/*


war configs am emrgen um requesthandler service alle bilder zu laden..