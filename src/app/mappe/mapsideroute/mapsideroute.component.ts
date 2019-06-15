import { Component, AfterViewInit, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgModel } from '@angular/forms';

import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

import { GeoService } from 'src/app/app-core/service/geo-service';
import { LocationResult } from 'src/app/app-core/model/LocationResult';
import { TraceRouteArgs } from 'src/app/app-core/event/TraceRouteArgs';
import { MoveMapFixArgs } from 'src/app/app-core/event/MoveMapFixArgs';
import { MoveMapTrkArgs } from 'src/app/app-core/event/MoveMapTrkArgs';
import { RouteLegs } from 'src/app/app-core/model/routeLegs';

@Component({
  selector: 'app-mapsideroute',
  templateUrl: './mapsideroute.component.html',
  styleUrls: ['./mapsideroute.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSideRouteComponent implements AfterViewInit {
  @ViewChild('refAddrdep') refAddrdep: NgModel;
  @ViewChild('refAddrarr') refAddrarr: NgModel;
  @Output() movemapfix = new EventEmitter<MoveMapFixArgs>();
  @Output() movemaptrk = new EventEmitter<MoveMapTrkArgs>();
  @Output() traceroute = new EventEmitter<TraceRouteArgs>();
  @Output() clearmap = new EventEmitter();
  addrdep: string;
  addrarr: string;
  curraddrdep: LocationResult;
  curraddrarr: LocationResult;
  locationsdep: LocationResult[];
  locationsarr: LocationResult[];
  routeslegs: any[];
  focusaddrdep: boolean;
  focusaddrarr: boolean;
  focusroute: boolean;
  mode: string;

  constructor(private geo: GeoService) {
    this.addrdep = '';
    this.addrarr = '';
    this.focusaddrdep = false;
    this.focusaddrarr = false;
    this.focusroute = false;
    this.mode = 'd';
  }

  ngAfterViewInit() {
    this.refAddrdep.valueChanges.pipe(
      debounceTime(150),
      filter((addr: string) => addr && addr.length >= 3),
      distinctUntilChanged(),
      switchMap(addr => this.geo.getLocationByAddress(addr)),
    ).subscribe(response => {
      this.locationsdep = this.geo.getLocationResult(response);
      if (this.locationsdep && this.locationsdep.length > 0) {
        this.curraddrdep = this.locationsdep[0];
        this.addrdep = this.locationsdep[0].address;
      } else {
        this.curraddrdep = undefined;
        this.addrdep = '';
      }
    });
    this.refAddrarr.valueChanges.pipe(
      debounceTime(150),
      filter((addr: string) => addr && addr.length >= 3),
      distinctUntilChanged(),
      switchMap(addr => this.geo.getLocationByAddress(addr)),
    ).subscribe(response => {
      this.locationsarr = this.geo.getLocationResult(response);
      if (this.locationsarr && this.locationsarr.length > 0) {
        this.curraddrarr = this.locationsarr[0];
        this.addrarr = this.locationsarr[0].address;
      } else {
        this.curraddrarr = undefined;
        this.addrarr = '';
      }
    });
  }

  onModeChanged(mode: string) {
    this.mode = mode;
  }

  onFocusAddrdep() {
    if (this.focusroute === true) {
      return;
    }
    this.focusaddrdep = true;
    this.focusaddrarr = false;
  }

  onGeolocateDep() {
    if (!this.addrdep) {
      return;
    }
    const args = new MoveMapFixArgs(this.curraddrdep);
    this.movemapfix.emit(args);
  }

  onSelectDep(location) {
    this.curraddrdep = location;
    this.addrdep = location.address;
  }

  onFocusAddrarr() {
    if (this.focusroute === true) {
      return;
    }
    this.focusaddrarr = true;
    this.focusaddrdep = false;
  }

  onGeolocateArr() {
    if (!this.addrarr) {
      return;
    }
    const args = new MoveMapFixArgs(this.curraddrarr);
    this.movemapfix.emit(args);
  }

  onSelectArr(location) {
    this.curraddrarr = location;
    this.addrarr = location.address;
  }

  onRouteTrk(route: RouteLegs) {
    const args = new MoveMapTrkArgs(route);
    this.movemaptrk.emit(args);
  }

  onTrace() {
    this.focusaddrarr = false;
    this.focusaddrdep = false;
    this.focusroute = true;
    const dep = this.curraddrdep.getLatLngAsString();
    const arr = this.curraddrarr.getLatLngAsString();
    this.geo.getRouteByType(this.mode, dep, arr).subscribe(response => {
      const result = this.geo.getRouteResult(response);
      this.routeslegs = result.routeslegs;
      const args = new TraceRouteArgs(result);
      this.traceroute.emit(args);
    });
  }

  onClear() {
    this.addrdep = '';
    this.addrarr = '';
    this.curraddrdep = undefined;
    this.curraddrarr = undefined;
    this.locationsdep = [];
    this.locationsarr = [];
    this.routeslegs = [];
    this.focusaddrarr = false;
    this.focusaddrdep = false;
    this.focusroute = false;
    this.clearmap.emit();
  }

}
