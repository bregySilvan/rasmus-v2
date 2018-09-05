//const image2base64 = require('image-to-base64');
var base64Img = require('base64-img');
function printBase64(path: string) {
    base64Img.base64(path, function(err, data) {
        if(err) console.log(err);
        else console.log(data);
    });
}

let p1 = './pictures/sponge.gif';
let p2 = './pictures/moegis.jpg';
let p3 = './pictures/fun-ahead.png';

//printBase64(p1);
//printBase64(p2);
printBase64(p3);