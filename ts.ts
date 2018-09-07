import * as os from 'os';


//const os = require('os');
export class SystemInfo {



    get arch(): string {
        return os.arch();
    }

    get hostname(): string {
        return os.hostname();
    }
}

var info = new SystemInfo();
console.log(info.arch);

Object.keys(os).forEach(key => {
    if(typeof os[key] === 'function') {
        console.log(key+'():',os[key]());
    }
})/*
console.log('tmpdir',os.tmpdir());
console.log('release',os.release());
console.log('type',os.type());
console.log(os.relesase());
console.log(os.relesase());
console.log(os.relesase());*/