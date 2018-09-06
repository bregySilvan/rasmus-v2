import { IConfig } from '../settings/config.interface';

// variables used in functions.
declare var Image, XMLHttpRequest, document, window, displayImage, getActualImages: any;
declare var config: IConfig;

// plain js functions which are sent as text to the client. The client holds only the logic to switch and reload 
// pictures from server.
export const PLAIN_JS_FUNCTIONS_UI = {
    displayImage(base64) {

        console.log('images received: ', base64);
        base64 = base64[0];

      //  var canvas = document.getElementById(config.pictureElementId);
        var canvas = document.getElementById('picture');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var ctx = canvas.getContext("2d");

        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = base64;
    },

    getActualImages() {

        const Http = new XMLHttpRequest();
        const href = window.location.href;
        const domain = href.substring(0, href.lastIndexOf('/'));

      //  const url = `http://${config.localAddress}:${config.port}${config.locations.pictures}`;
        const url = 'http://192.168.1.254:5001/pictures';
        Http.onreadystatechange = (e) => {
            if (e.target.readyState == 4 && e.target.status == 200) {
                displayImage(JSON.parse(Http.responseText));
            }
        }
        Http.open("GET", url);
        Http.send();
    },

    startShow() {
        // show started
        getActualImages();
    
    },
}

//    setTimeout(() => PLAIN_JS_FUNCTIONS_UI.getActualImages(), 4000);

