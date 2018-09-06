import { Request } from '../request';
import { IConfig } from '../../settings/config.interface';

export abstract class Job {
    abstract extractRelevantContent: (content: string) => string;
    extractUrls(relevantContent: string): string[] {
        return [];
    }

    run() {
        Request.get(this.url).then(body => {
            let relevantContent = this.extractRelevantContent(body);
            let imageUrls = this.extractUrls(body);
            imageUrls.forEach(url => Request.downloadImage(url, this.destFile));
        });
    }

    get destFile() {
        return `${this.destFolder}/${this.destFile}`;
    }

    constructor(private url: string,
                private destFolder: string,
                private imageName: string) {

    }
}