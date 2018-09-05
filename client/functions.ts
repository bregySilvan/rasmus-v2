
declare var Image, XMLHttpRequest, document, window: any;

export const PLAIN_JS_FUNCTIONS_UI = {
    getActualImages: () => {

        const Http = new XMLHttpRequest();
        const href = window.location.href;
        const domain = href.substring(0, href.lastIndexOf('/'));
        const url = domain+'/pictures';

        Http.onreadystatechange = (e) => {
            console.log(Http.responseText);
            displayImage(Http.responseText);
        }
        Http.open("GET", url);
        Http.send();
    },

    displayImage: (base64) => {
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = base64;
    },

    // show is automatically started after 5 seconds.
    runShow: (() => {
        setTimeout(() => PLAIN_JS_FUNCTIONS_UI.getActualImages.call(this), 5000);
    })()
    

}



