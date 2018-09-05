import { Request } from 'express';
import * as express from 'express';
import * as _ from 'lodash';
import { BASE64 } from '../test';
import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import { UIBuilder } from '../classes/ui-builder';
import { toBase64 } from '../utils/base64';
import { IServerConfig } from '../settings/server-config.interface';
import { listFiles } from '../utils/fs-extra';

export class RequestHandlerService {
    
    private uiFunctions = PLAIN_JS_FUNCTIONS_UI;

    public constructor(private config: IServerConfig) {
       
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(200);
        res.send(this.getUI());
        res.end();
    }

    public onGetPictures(req: express.Request, res: express.Response, next: express.NextFunction) {
        let location = this.config.serverPicturesLocation+'/';
        listFiles(location)
            .then((pics: string[]) => Promise.all(pics.map(pic => toBase64(location+pic))))
            .then((encodedPics: string[]) => {
                res.status(200);
                res.send(JSON.stringify(encodedPics));
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



