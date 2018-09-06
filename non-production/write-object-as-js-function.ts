import { writeFile } from '../utils/fs-extra';
// write down current config as plain javascript for serving it as function to client
function writeJsConfig(): void {
    let configPath = this.config.publicFilesLocation + this.config.publicConfigfileName;
    let contents = 'function config() { \n  return ';
    contents = this.writeObject(this.config, contents);
    contents += ';\n'
    writeFile(configPath, contents);

}

function writeObject(obj: Object, contents: string, depth: string = ''): string {
  //  console.log(this.config);
    let keys = Object.keys(this.config);
    let newDepth = depth + '  ';
    contents += ' {\n'
    keys.forEach((key, index) => {
        var a: Array<any>
        let val = obj[key];
        contents += `${depth}${key}: `;
        console.log(typeof val);
        if (typeof val === 'object') {
            if (val[0]) {
                contents += '[';
                (<Array<string | number>>val).forEach(v => contents += `${JSON.stringify(val)},`);
                contents += ']';
            } else {
             //   console.warn('lets write obj');
                contents += this.writeObject(obj, contents, newDepth);
            }

        } else {
            contents += JSON.stringify(val);
        }
        if (index !== keys.length - 1)
            contents += ',\n'
    });
    contents += depth + '\n }'
    return contents;
}
