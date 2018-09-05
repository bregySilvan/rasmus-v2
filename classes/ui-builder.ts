import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import * as _ from 'lodash';

export class UIBuilder {

    private contents = '';
    private functions = PLAIN_JS_FUNCTIONS_UI;

    static build(): UIBuilder {
        return new UIBuilder();
    }

    html(closing: boolean = false): UIBuilder {
        return this.appendTag('html', closing);
    }

    head(closing: boolean = false): UIBuilder {
        return this.appendTag('head', closing);
    }

    body(closing: boolean = false) {
        return this.appendTag('body', closing);
    }

    bodyContents(): UIBuilder {
        return this.append(`<canvas id="picture"></canvas>`);
    }

    javascript() {
        this.appendTag('script', false);
        this.append('var images = { };')
        this.append(`var canvas = document.getElementById('picture');`);
        this.append(`var ctx = canvas.getContext("2d");`);
        this.appendAll(_.functions(this.functions).map(f => ''+this.functions[f]));
        return this.appendTag('script', true);
    }

    toString() {
        return this.contents;
    }

    append(text: string) {
        this.contents += text;
        return this;
    }

    appendAll(data: string[]) {
        data.forEach(d => this.append(d));
        return this;
    }

    appendTag(tagName: string, closing: boolean) {
        let tagStart = closing ? '</' : '<';
        return this.append(tagStart + tagName + '>');
    }

    private constructor() {

    }
}

/*

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

getActualImages();
*/