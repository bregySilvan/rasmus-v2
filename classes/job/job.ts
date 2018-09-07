import { Request } from '../request';
import { IConfig } from '../../settings/config.interface';
import { createId } from '../../utils/id';
import { REG_EXP } from '../../utils/regex';
import { toDomain } from '../../utils/url';
import { Cache } from '../cache';
import { randomElement } from '../../utils/random';

export abstract class Job {

    private _id = createId();
    private imageRegex = REG_EXP.imageTag;
    protected abstract parseUrls(body: string): string[];

    async run(): Promise<void> {
        let body: string;

        if(Cache.has(this.url)) {
            body = Cache.get(this.url);
        } else {
            body = await Request.get(this.url);
            Cache.put(this.url, body);
        }

        let url = randomElement(this.parseUrls(Cache.get(this.url)));
        let extension = url.substring(url.lastIndexOf('.'));
        let newFile = `${this.config.serverPicturesLocation}/${this._id}${extension}`;
        Request.downloadImage(url, newFile);

    }

    protected extractImageTags(body: string): string[] {
        return body.match(this.imageRegex);
    }

    get id(): string {
        return this._id;
    }

    get fileExtension(): string {
        return this.url.substring(this.url.lastIndexOf('.'));
    }

    get domain(): string {
        return toDomain(this.url);
    }

    constructor(private config: IConfig,
                private url: string) {

    }
}