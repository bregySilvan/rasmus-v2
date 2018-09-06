import { IConfig } from '../settings/config.interface';

// variables used in functions.
declare var Image, displayImage, XMLHttpRequest, currentIndex, images, alert, document, window, loadImages, isLoading, loadConfig, displayNextImage, httpRequest, serverRequest: any;
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
        console.log('requesting url:', url);
        const Http = new XMLHttpRequest();
        Http.onreadystatechange = (e) => {
            if (e.target.readyState == 4) {
                if (e.target.status == 200) {
                    callback(JSON.parse(Http.responseText));
                } else {
                    console.error('request failed..');
                    callback(undefined);
                }
            }
        }
        Http.open("GET", url, true);
        Http.send(null);
    },

    serverRequest(location, callback) {
        const url = `http://${config.serverAddress}:${config.serverPort}${location}`;
        httpRequest(url, callback);
    },

    loadConfig(callback) {
        // config object before following request holds only ipAddress, port and locations props
        serverRequest(config.locations.config, res => {
            if (!res) {
                alert('program crashed. Config could not be loaded. Please refresh page..');
                throw 'REQUESTING http://192.168.1.254:5001/config FAILED DUE TO AN UNKNOWN ERROR';
            }
            callback(res);
        });
    },

    loadImages() {
        isLoading = true;
        console.log('loading images');
        const location = config.locations.pictures;
        serverRequest(location, imgs => {
            if (imgs && imgs.length > 0) {
                images = imgs;
            }
            isLoading = false;
        });
    },

    displayNextImage() {
        if (isLoading) {
            console.log('Displaying Image failed because images are upating on server.')
            return;
        }
        if (images.length === 0) {
            console.error('error, no images loaded. SO no pic can be displayed right? SHIT..! SHOULD NOT HAPPEN');
            return;
        }
        if (++currentIndex > images.length - 1) {
            currentIndex = 0;
        }
        if (!isLoading) {
            console.log('displaying next image');
            displayImage(images[currentIndex]);
        }
        else {
            console.warn('Displaying Image failed because images are upating on server.\n => currentIndex still incremented');
        }
    },

    startShow() {
        console.log('application running');
        loadConfig(res => {
            config = res;
            console.log('starting dia show');
            loadImages();
            setInterval(() => loadImages(), config.reloadPictureTimeMs);
            setInterval(() => displayNextImage(), config.pictureDisplayTimeMs);
        });
    }
}
