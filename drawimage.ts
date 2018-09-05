
    var images = {};

    declare var Image, XMLHttpRequest, document: any;

    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");


    function displayImage(base64) {
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = base64;
    }

    function getActualImages() {
        const Http = new XMLHttpRequest();
        const url = 'http://192.168.1.254:5001/pictures';
        Http.onreadystatechange = (e) => {
            console.log(Http.responseText);
            displayImage(Http.responseText);
        }
        Http.open("GET", url);
        Http.send();
    }

    getActualImages();
