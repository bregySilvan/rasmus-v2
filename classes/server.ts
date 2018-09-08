import * as express from 'express';
import { CustomRouter } from './router';
import { IConfig } from '../settings/config.interface';
import { Setup } from './setup';

export class Server {

    constructor() {
        //
    }

    public async start(config: IConfig): Promise<Server> {
        return new Promise<Server>((resolve, reject) => {
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
                resolve(this);
            });
            app.on('error', (reject));
        })
    }

}