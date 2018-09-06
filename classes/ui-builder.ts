import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import * as _ from 'lodash';
import { IConfig } from '../settings/config.interface';

export class UIBuilder {

    private contents = '';
    private functions = PLAIN_JS_FUNCTIONS_UI;

    static build(config: IConfig): UIBuilder {
        return new UIBuilder(config);
    }

    html(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('html', isClosingTag);
    }

    head(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('head', isClosingTag);
    }

    fullBody(): UIBuilder {
        this.appendTag('body', false);
        this.append(`<canvas id="${this.config.pictureElementId}"></canvas>`);
        return this.appendTag('body', true);
    }

    fullJs() {
        this.appendTag('script', false);
        this.append('var images = { };');
        this.appendAll(_.functions(this.functions)
            .map(f => this.sanitiseFunction(''+this.functions[f], f)));
        // functions which executes itself after 4 seconds for starting show
        this.append('(function() { setTimeout(function() { startShow(); }, 4000) })()');
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

    appendTag(tagName: string, isClosingTag: boolean) {
        let tagStart = isClosingTag ? '</' : '<';
        return this.append(tagStart + tagName + '>');
    }

    sanitiseFunction(func: string, name: string) {
        let plainFunctionBody = func.substring(func.indexOf('('));
        return 'function '+name+plainFunctionBody;
    }

    private constructor(private config: IConfig) {
        // private constructor for builder pattern!
    }
}
