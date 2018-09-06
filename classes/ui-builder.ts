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
        this.appendTag('canvas', false, { id: this.config.pictureElementId });
        this.appendTag('canvas', true);
        return this.appendTag('body', true);
    }

    jsTag(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('script', isClosingTag);
    }

    jsCode(): UIBuilder {
        this.append('var images = [];\n');
        this.append('var currentIndex = 0;\n');
        this.append('var isLoading = false;\n')
        this.append(`var config = { };\n`);
        this.appendAll(_.functions(this.functions)
            .map(f => this.sanitiseFunction('' + this.functions[f], f)));
        // start diashow show after delay 
        return this.append(`setTimeout(function() { startShow(); }, ${this.config.showStartDelay});`);
    }

    toString() {
        return this.contents;
    }

    append(text: string): UIBuilder {
        this.contents += text;
        return this;
    }

    appendAll(data: string[]): UIBuilder {
        data.forEach(d => this.append(d));
        return this;
    }

    appendTag(tagName: string, isClosingTag: boolean, propertys: { [key: string]: string } = {}): UIBuilder {
        let fullStartTag;
        if (!isClosingTag) {
            fullStartTag = '<' + tagName;
            Object.keys(propertys).forEach(key => fullStartTag += ` ${key}="${propertys[key]}"`);
        } else {
            fullStartTag = '</' + tagName;
        }
        return this.append(fullStartTag + '>');
    }

    sanitiseFunction(func: string, name: string): string {
        let plainFunctionBody = func.substring(func.indexOf('('));
        return 'function ' + name + plainFunctionBody;
    }

    private constructor(private config: IConfig) {
        // private constructor for builder pattern!
    }
}
