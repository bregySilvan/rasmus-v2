import { Request } from 'express';
import * as express from 'express';
import * as _ from 'lodash';
import { BASE64 } from '../test';
import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import { UIBuilder } from '../classes/ui-builder';
import { toBase64 } from '../utils/base64';
import { IConfig } from '../settings/config.interface';
import { listFiles } from '../utils/fs-extra';
import { SERVER_PICTURES_LOCATION } from '../settings/server-config';

export class RequestHandlerService {
    
    private uiFunctions = PLAIN_JS_FUNCTIONS_UI;

    private serverConfig = {
        serverPictures: SERVER_PICTURES_LOCATION
    }

    public constructor(private config: IConfig) {
 
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(200);
        res.send(this.getUI());
        res.end();
    }

    public onGetPictures(req: express.Request, res: express.Response, next: express.NextFunction) {
        listFiles(this.config.customPicturesLocation)
        var picture = './pictures/sponge.gif';
        toBase64(picture, (encoded: string) => {
            var pictures = [encoded];
            res.status(200);
            res.send(JSON.stringify(pictures));
            res.end();
            next();
        });
    }


    private _respond(req: express.Request, res: express.Response, next: express.NextFunction) {
 
    }

    private getUI(): string {

        return UIBuilder.build()
            .html()
            .head()
            .fullJs()
            .head(true)
            .fullBody()
            .html(true)
            .toString();
    }
}



