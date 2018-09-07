
export class Cache {
    static DEFAULT_CLEAN_TIMEOUT = 8 * 60  * 1000;

    static cache: { [key: string] : any } = { };
    static cleaner: { [key: string]: NodeJS.Timer } = { };

    static has(key: string): boolean {
        return !!Cache.cache[key];
    }

    static put(key: string, value: any) {
        Cache.cache[key] = value;
        this.setCleaner(key);
    }

    static get(key: string) {
        return Cache.cache[key];
    }

    static remove(key: string) {
        if(Cache.cleaner[key]) {
            clearTimeout(Cache.cleaner[key]);
            Cache.cache[key] = undefined;
        }
    }

    static setCleaner(key: string) {
        if(Cache.cleaner[key]) {
            clearTimeout(Cache.cleaner[key]);
        }
        Cache.cleaner[key] = setTimeout(() => {
            Cache.cache[key] = undefined;
            Cache.cleaner[key] = undefined;
        }, Cache.DEFAULT_CLEAN_TIMEOUT)
    }
    
}