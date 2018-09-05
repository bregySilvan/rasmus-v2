
var base64Img = require('base64-img');

export function toBase64(path: string, cb: (encoded: string) => void): void {
    base64Img.base64(path, function(err, data) {
        if(err)  {
            console.log(err);
        }
        return cb(data || '');
    });
}