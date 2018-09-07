import { Job } from './job';
import { IConfig } from '../../settings/config.interface';
import { REG_EXP } from '../../utils/regex';

export class SteinbockJob extends Job {

    private steinbockPictureUrl: RegExp = REG_EXP.steinbockPictureUrl;

    parseUrls(body: string): string[] {
        return body.match(this.steinbockPictureUrl)
            .map(url => `https://${this.domain}${url.replace('..', '')}`);
    }

    constructor(config: IConfig, url: string = 'https://www.steinbock77.ch/kameras/index.php') {
        super(config, url);

    }
}