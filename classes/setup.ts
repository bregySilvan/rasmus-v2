import { IConfig } from '../settings/config.interface';
import { copyFile, listFiles, removeSync, mkdirSync, existsSync } from '../utils/fs-extra';

export class Setup {

    public start(): void {
        // remove old pictures.
        this.clearServerPictures();
        this.copyCustomFiles();
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

    }


}