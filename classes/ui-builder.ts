import { PLAIN_JS_FUNCTIONS_UI } from '../client/functions';
import * as _ from 'lodash';
import { IConfig } from '../settings/config.interface';

export class UIBuilder {

    private contents = '';
    private functions: { [key: string]: Function } = PLAIN_JS_FUNCTIONS_UI;

    static build(config: IConfig): UIBuilder {
        return new UIBuilder(config);
    }

    html(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('html', isClosingTag);
    }

    head(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('head', isClosingTag);
    }

    bodyDiaShow(): UIBuilder {
        this.appendTag('body', false);
        this.appendTag('canvas', false, { id: this.config.pictureElementId });
        this.appendTag('canvas', true);
        return this.appendTag('body', true);
    }

    bodySettings(): UIBuilder {

        return this;
    }

    jsTag(isClosingTag: boolean = false): UIBuilder {
        return this.appendTag('script', isClosingTag);
    }

    // this function holds all javascript the client needs on the first request as hardcoded javascript.
    // the client is only responsible for showing pictures and in plain javascript.
    jsCodeDiashow(): UIBuilder {
        this.append('var images = [];\n');
        this.append('var currentIndex = 0;\n');
        this.append('var isLoading = false;\n')
        this.append(`var config = {\n
            serverAddress: "${this.config.serverAddress}",\n
            serverPort: ${this.config.serverPort},\n
            locations: { config: '/config' }\n
        };\n`);
        this.appendAll(_.functions(this.functions)
            .map(f => this.sanitiseFunction('' + this.functions[f], f)));
        // start diashow show after delay 
        return this.append(`setTimeout(function() { startShow(); }, ${this.config.showStartDelay});`);
    }

    jsCodeSettings(): UIBuilder {
        

        return this;
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

    // make "function() { }" to "function foo() { }"
    // representation of functions is without its name.
    sanitiseFunction(func: string, name: string): string {
        let plainFunctionBody = func.substring(func.indexOf('('));
        return 'function ' + name + plainFunctionBody;
    }

    private constructor(private config: IConfig) {
        // private constructor for builder pattern!
    }
}
