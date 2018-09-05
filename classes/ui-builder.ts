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

    fullBody(): UIBuilder {
        this.appendTag('body', false);
        this.append(`<canvas id="picture"></canvas>`);
        return this.appendTag('body', true);
    }

    fullJs() {
        this.appendTag('script', false);
        this.append('images = { };');
        this.appendAll(_.functions(this.functions)
            .map(f => this.sanitiseFunction(''+this.functions[f], f)));
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

    sanitiseFunction(func: string, name: string) {
        let plainFunctionBody = func.substring(func.indexOf('('));
        return 'function '+name+plainFunctionBody;
    }

    private constructor() {
        // private constructor for builder pattern!
    }
}
