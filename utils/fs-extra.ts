
import * as fs from 'fs-extra';

export async function copyFile(sourceFile: string, newFile: string): Promise<void> {
    return fs.copy(sourceFile, newFile);
}

export async function listFiles(directory: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error(err);
                return resolve([]);
            }
            resolve(files);
        })
    });
}

export function writeFile(file: string, contents: string) {
    fs.writeFile(file, contents, (err) => {
        if(err) console.error(err);
    });
}

export function removeSync(dir: string) {
    return fs.removeSync(dir);
}

export function mkdirSync(dir: string) {
    return fs.mkdirSync(dir);
}

export function existsSync(file: string) {
    return fs.existsSync(file);
}

export function createWriteStream(file: string) {
    return fs.createWriteStream(file);
}