import * as express from 'express';
import { CustomRouter } from './router';
import { IServerConfig } from '../settings/server-config.interface';
import { IConfig } from '../settings/config.interface';
import { Setup } from './setup';

export class Server {

    constructor() {
        //
    }

    public start(config: IConfig) {
        let port = config.serverPort;
        var app = express();
        var customRouter: CustomRouter = new CustomRouter(app, config);
        new Setup(config).start();
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
            console.log(`request url: http://${config.serverAddress}:${port}`);
            console.log('## active locations');
            customRouter.activeLocations.sort().forEach((location: string) => {
                console.log(location);
            });
        });
    }
    
}