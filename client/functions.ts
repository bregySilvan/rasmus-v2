import { IConfig } from '../settings/config.interface';

// variables used in functions.
declare var Image, XMLHttpRequest, displayImage, currentIndex, images, document, window, loadImages, isLoading, loadConfig, displayNextImage, httpRequest: any;
declare var config: IConfig;

// plain js functions which are sent as text to the client. The client holds only the logic to switch and reload 
// pictures from server.
export const PLAIN_JS_FUNCTIONS_UI = {
    displayImage(base64) {

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

    httpRequest(url, callback) {
        const Http = new XMLHttpRequest();
        const href = window.location.href;
        const domain = href.substring(0, href.lastIndexOf('/'));

        // const url = `http://${config.localAddress}:${config.port}${config.locations.pictures}`;
        // const url = 'http://192.168.1.254:5001/pictures';
        Http.onreadystatechange = (e) => {
            if (e.target.readyState == 4 && e.target.status == 200) {
                callback(JSON.parse(Http.responseText));
            }
        }
        Http.open("GET", url);
        Http.send();
    },

    displayNextImage() {
        if (isLoading) {
            return;
        }
        if (images.length === 0) {
            console.error('error, no images loaded. SO no pic can be displayed right? SHIT..! SHOULD NOT HAPPEN');
            return;
        }
        if (++currentIndex > images.length - 1) {
            currentIndex = 0;
        }
        displayImage(images[currentIndex])
    },

    loadImages() {
        isLoading = true;
        const url = 'http://192.168.1.254:5001/pictures';
        httpRequest(url, imgs => {
            images = imgs;
            isLoading = false;
        });
    },

    loadConfig(callback) {
        const url = 'http://192.168.1.254:5001/config';
        httpRequest(url, callback);
    },

    startShow() {
        loadConfig(res => {
            config = res;
            loadImages();
            setInterval(() => loadImages(), 23 * 1000);
            setInterval(() => displayNextImage(), 7000);
        });
    }
}
