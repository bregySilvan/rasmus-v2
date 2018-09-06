import * as express from 'express';
import { CustomRouter } from './router';
import { IServerConfig } from '../settings/server-config.interface';
import { IConfig } from '../settings/config.interface';

export class Server {

    constructor() {
        //
    }

    public start(config: IConfig) {
        let usedPort = config.port || 55555;
        var app = express();
        var customRouter: CustomRouter = new CustomRouter(app, config);
        app.listen(usedPort, () => {
            console.log(`listening on port ${usedPort}`);
            console.log(`request url: http://localhost:${usedPort}`);
            console.log('## active locations');
            customRouter.activeLocations.sort().forEach((location: string) => {
                console.log(location);
            });
        });
    }

    private setup() {
        
    }
}