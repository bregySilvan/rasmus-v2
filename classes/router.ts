import * as express from 'express';
import { RequestHandlerService } from '../services/request-handler-service';
import { DataService } from '../services/data-service';
import { LOCATIONS } from '../settings/locations';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandlerService;
    private _activeLocations: string[];
    private locations = LOCATIONS;

    constructor(private _app?: express.Express) {
        this._app = _app || express();
        this._router = express.Router();
        this._requestHandler = new RequestHandlerService();
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
    }

    get activeLocations(): string[] {
        return this._activeLocations;
    }

    private _activateRoutes() {

        // @todo: create correct handler function in requesthandler
        this._addRoute(LOCATIONS.show, 'get', this._requestHandler.onPostElements);
        this._addRoute(LOCATIONS.show, 'get', this._requestHandler.onPostElements);
        
    }

    private _addRoute(location: string, method: 'post' | 'get', 
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }



}



