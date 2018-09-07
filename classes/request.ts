import * as request from 'request';
import { writeFile, createWriteStream } from '../utils/fs-extra';
import * as imageDownload from 'image-download';

export class Request {

    constructor() {

    }

    public static async get(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request(url, (err, res, body) => {
                if (err) {
                    console.error(err);
                    return resolve(undefined)
                }
                resolve(body);
            })
        });
    }

    public static async downloadImage(imageUrl: string, newFile: string): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            request.get(imageUrl)
                .on('complete', resolve)
                .on('error', err => {
                    console.error(err);
                    resolve();
                })
                .pipe(createWriteStream(newFile)));
    }
}
