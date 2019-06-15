import { RouteLegs } from './routelegs';
import { RoutePath } from './routepath';

export class RouteResult {
    routeslegs: RouteLegs[];
    routespath: RoutePath[];
    distance: string;
    duration: string;

    constructor(routeslegs: RouteLegs[], routespath: RoutePath[]) {
        this.routeslegs = routeslegs;
        this.routespath = routespath;
    }

}
