"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAIN_JS_FUNCTIONS_UI = {
    displayImage: function (base64) {
        var canvas = document.getElementById(config.pictureElementId);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = base64;
    },
    httpRequest: function (url, callback) {
        console.log('requesting url:', url);
        var Http = new XMLHttpRequest();
        Http.onreadystatechange = function (e) {
            if (e.target.readyState == 4) {
                if (e.target.status == 200) {
                    callback(JSON.parse(Http.responseText));
                }
                else {
                    console.error('request failed..');
                    callback(undefined);
                }
            }
        };
        Http.open('GET', url, true);
        Http.send(null);
    },
    serverRequest: function (location, callback) {
        var url = "http://" + config.serverAddress + ":" + config.serverPort + location;
        httpRequest(url, callback);
    },
    loadConfig: function (callback) {
        serverRequest(config.locations.config, function (res) {
            if (!res) {
                alert('program crashed. Config could not be loaded. Please refresh page..');
                throw "REQUESTING http://" + config.serverAddress + ":" + config.serverPort + config.locations.config + " FAILED DUE TO AN UNKNOWN ERROR";
            }
            callback(res);
        });
    },
    loadImages: function () {
        isLoading = true;
        console.log('loading images');
        var location = config.locations.pictures;
        serverRequest(location, function (imgs) {
            if (imgs && imgs.length > 0) {
                images = imgs;
            }
            isLoading = false;
        });
    },
    displayNextImage: function () {
        if (isLoading) {
            console.log('Displaying Image failed because images are upating on server.');
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
    startShow: function () {
        console.log('application running');
        loadConfig(function (res) {
            config = res;
            console.log('starting dia show');
            loadImages();
            setInterval(function () { return loadImages(); }, config.reloadPicturesOnClientMs);
            setInterval(function () { return displayNextImage(); }, config.pictureDisplayTimeMs);
        });
    }
};
//# sourceMappingURL=functions.js.map