import * as express from 'express';
import { RequestHandlerService } from '../services/request-handler-service';
import { IConfig } from '../settings/config';
import { ILocationMap } from '../settings/server-config.interface';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandlerService;
    private _activeLocations: string[];
    private locations: ILocationMap;

    constructor(private _app: express.Express, private config: IConfig) {
        this._app = _app;
        this._router = express.Router();
        this._requestHandler = new RequestHandlerService(this.config);
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
        this.locations = config.locations;
    }

    get activeLocations(): string[] {
        return this._activeLocations;
    }

    private _activateRoutes() {

        this._addRoute(this.locations.pictures, 'get', this._requestHandler.onGetPictures);
        this._addRoute(this.locations.show, 'get', this._requestHandler.onGetShow);
        
    }

    private _addRoute(location: string, method: 'post' | 'get', 
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }



}



