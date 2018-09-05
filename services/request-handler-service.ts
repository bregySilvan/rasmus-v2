import { Request } from 'express';
import * as express from 'express';
import * as _ from 'lodash';
import { BASE64 } from '../test';
import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import { UIBuilder } from '../classes/ui-builder';

export class RequestHandlerService {
    
    private uiFunctions = PLAIN_JS_FUNCTIONS_UI;

    public constructor() {
 
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(200);
        res.send(this.getUI());
        res.end();
    }

    public onGetPictures(req: express.Request, res: express.Response, next: express.NextFunction) {
        var pictures = [BASE64];
        res.status(200);
        res.json(pictures);
        res.end();
        next();
    }


    private _respond(req: express.Request, res: express.Response, next: express.NextFunction) {
 
    }

    private getUI(): string {

        let functions = _.functions(this.uiFunctions)
         // convert Function object to string with this simple trick
            .map(f => ''+this.uiFunctions[f]);

        return UIBuilder.build()
            .html()
            .head()
            .js()
            .appendAll(functions)
            .js(true)
            .head(true)
            .html(true)
            .toString();

    }
}



