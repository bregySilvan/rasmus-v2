import { IConfig } from '../settings/config.interface';
import { copyFile, listFiles, removeSync, mkdirSync, existsSync } from '../utils/fs-extra';
import { IntervalService } from '../services/interval-service';
import { SteinbockJob } from './job/steinbock-job';

export class Setup {

    private intervalService: IntervalService = new IntervalService();

    public start(): void {
        // remove old pictures.
        this.clearServerPictures();
        this.copyCustomFiles();
        this.startImageJobs();
    }

    constructor(private config: IConfig) {

    }

    private copyCustomFiles() {
        let srcFolder = this.config.customPicturesLocation;
        let destFolder = this.config.serverPicturesLocation;
        
        listFiles(srcFolder)
         .then(files => Promise.all(files.map(file => copyFile(`${srcFolder}/${file}`, `${destFolder}/${file}`))))
         .then(() => console.log('user files copied into server folder'))
         .catch(err => console.error(err));   
    }

    private clearServerPictures() {
        let target = this.config.serverPicturesLocation;
        if(existsSync(target)) {
            removeSync(target);
        } 
        mkdirSync(target);
    }

    private startImageJobs() {
        this.runSteinbockjobs();
    }

    private runSteinbockjobs() {
        let bockJobs: SteinbockJob[] = [];
        for(let i = 0; i < this.config.steinbockJobCount; i++) {
            bockJobs.push(new SteinbockJob(this.config));
        }
        this.intervalService.start(() => bockJobs.forEach(bockJob => bockJob.run()), this.config.reloadPicturesOnServerMs)
    }
}