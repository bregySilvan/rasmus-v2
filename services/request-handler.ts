import * as express from 'express';
import { UIBuilder } from '../classes/ui-builder';
import { toBase64 } from '../utils/base64';
import { listFiles } from '../utils/fs-extra';
import { IConfig } from '../settings/config.interface';

export class RequestHandler {

    public constructor(private config: IConfig) {

    }

    private isSuccess(res: express.Response, next: express.NextFunction, payload: any) {
        res.status(200);
        if (payload) {
            res.send(payload);
        }
        res.end();
        next();
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.isSuccess(res, next, this.buildDiashowUi());
    }

    public onGetPictures(req: express.Request, res: express.Response, next: express.NextFunction) {
        let location = this.config.serverPicturesLocation + '/';
        listFiles(location)
            .then((pics: string[]) => Promise.all(pics.map(pic => toBase64(location + pic))))
            .then((encodedPics: string[]) => this.isSuccess(res, next, JSON.stringify(encodedPics)));
    }

    public onGetConfig(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.isSuccess(res, next, JSON.stringify(this.config));
    }

    private buildDiashowUi(): string {

        return UIBuilder.build(this.config)
            .html()
            .head()
            .jsTag()
            .jsCodeDiashow()
            .jsTag(true)
            .head(true)
            .bodyDiaShow()
            .html(true)
            .toString();
    }
}



