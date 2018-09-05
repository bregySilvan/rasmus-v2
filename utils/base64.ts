
var base64Img = require('base64-img');

export async function toBase64(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        base64Img.base64(path, function(err, data) {
            if(err)  {
                console.log(err);
                return resolve('');
            }
            resolve(data);
        });
    })
    
}