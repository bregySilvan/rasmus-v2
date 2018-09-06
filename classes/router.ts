import * as express from 'express';
import { RequestHandler } from '../services/request-handler';
import { IConfig } from '../settings/config.interface';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandler;
    private _activeLocations: string[];

    constructor(private _app: express.Express, private config: IConfig) {
        this._app = _app;
        this._router = express.Router();
        this._requestHandler = new RequestHandler(this.config);
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
    }

    get activeLocations(): string[] {
        return this._activeLocations;
    }

    private _activateRoutes() {
        let locations = this.config.locations;
        this._addRoute(locations.pictures, 'get', this._requestHandler.onGetPictures);
        this._addRoute(locations.show, 'get', this._requestHandler.onGetShow);
        this._addRoute(locations.config, 'get', this._requestHandler.onGetConfig)
        
    }

    private _addRoute(location: string, method: 'post' | 'get', 
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }
}



