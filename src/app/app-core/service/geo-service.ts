import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { LocationResult } from '../model/locationresult';
import { RouteResult } from '../model/routeresult';
import { RouteLegs } from '../model/routelegs';
import { RoutePath } from '../model/routepath';

@Injectable()
export class GeoService {

  // https://www.searchdrivingdirections.com/bing-route-planner/
  private bingkey = 'AlvYaoptpnb1KDdE1ETQTu7XuvPnb5g8FBx3BC2jWrIX8lcudZEePIgaK5varhYV';

  constructor(private http: HttpClient) {}

  getLocationByCoord(lng: number, lat: number): Observable<object> {
    const url = `https://dev.virtualearth.net/REST/v1/Locations?${lat},${lng}&key=${this.bingkey}`;
    return this.http.get(url);
  }

  getLocationByAddress(q: string): Observable<object> {
    const url = `https://dev.virtualearth.net/REST/v1/Locations?q=${q}&key=${this.bingkey}`;
    return this.http.get(url);
  }

  getRouteByType(type: string, q1: string, q2: string): Observable<object> {
    if (type === 'd') {
      return this.getDrivingRoute(q1, q2);
    }
    if (type === 'w') {
      return this.getWalkingRoute(q1, q2);
    }
  }

  getDrivingRoute(q1: string, q2: string): Observable<object> {
    // tslint:disable-next-line:max-line-length
    const url = `https://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=${q1}&wp.1=${q2}&routeAttributes=routePath&key=${this.bingkey}`;
    return this.http.get(url);
  }

  getWalkingRoute(q1: string, q2: string): Observable<object> {
    // tslint:disable-next-line:max-line-length
    const url = `https://dev.virtualearth.net/REST/V1/Routes/Walking?wp.0=${q1}&wp.1=${q2}&routeAttributes=routePath&key=${this.bingkey}`;
    return this.http.get(url);
  }

  getLocationResult(response: any): LocationResult[] {
    let index = 1;
    const result = [];
    if (response.authenticationResultCode === 'ValidCredentials') {
      if (response.resourceSets && response.resourceSets.length > 0) {
        const sets = response.resourceSets[0];
        if (sets.resources && sets.resources.length > 0) {
          for (const item of sets.resources) {
            const lat = item.point.coordinates[0];
            const lng = item.point.coordinates[1];
            const point = { lat: lat, lng: lng };
            const address = item.address.formattedAddress;
            const r = new LocationResult(index, point, address);
            result.push(r);
            index++;
          }
        }
      }
    }
    return result;
  }

  getRouteResult(response: any): any {
    let indexlegs = 1;
    const routeslegs = [];
    let indexpath = 1;
    const routespath = [];
    let distance;
    let duration;
    if (response.authenticationResultCode === 'ValidCredentials') {
      if (response.resourceSets && response.resourceSets.length > 0) {
        const sets = response.resourceSets[0];
        if (sets.resources && sets.resources.length > 0) {
          distance = sets.resources[0].travelDistance;
          duration = sets.resources[0].travelDuration;
          for (const m1 of sets.resources[0].routeLegs) {
            for (const m2 of m1.itineraryItems) {
              const lat = m2.maneuverPoint.coordinates[0];
              const lng = m2.maneuverPoint.coordinates[1];
              const point = { lat: lat, lng: lng };
              const instruction = m2.instruction.text;
              const legsdist = m2.travelDistance;
              const r1 = new RouteLegs(indexlegs, point, instruction, legsdist);
              routeslegs.push(r1);
              indexlegs++;
            }
          }
          for (const m3 of sets.resources[0].routePath.line.coordinates) {
            const point = { lat: m3[0], lng: m3[1] };
            const r2 = new RoutePath(indexpath, point);
            routespath.push(r2);
            indexpath++;
          }
        }
      }
    }
    const result = new RouteResult(routeslegs, routespath);
    result.distance = distance;
    result.duration = (duration / 3600).toFixed(2);
    return result;
  }

}
