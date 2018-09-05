
declare var Image, XMLHttpRequest, document, window: any;

export const PLAIN_JS_FUNCTIONS_UI = {
   

    displayImage(base64) {

        var canvas = document.getElementById('picture');
        var ctx = canvas.getContext("2d");

        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = base64;
    },

    getActualImages ()  {

        const Http = new XMLHttpRequest();
        const href = window.location.href;
        const domain = href.substring(0, href.lastIndexOf('/'));
        const url = domain+'/pictures';
        var i = 1;
        Http.onreadystatechange = (e) => {
            console.log(e);
            if (e.target.readyState == 4 && e.target.status == 200) {
                displayImage(JSON.parse(Http.responseText)[0]);
              }    
        }
        Http.open("GET", url);
        Http.send();
    },


}



