import { Component, AfterViewInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @types/ol is 4.6.2 - OpenLayers 4.6.2
// import * as proj from 'ol/proj';

import Map from 'ol/Map';
import OSM from 'ol/source/osm';
import BingMaps from 'ol/source/BingMaps';
import Stamen from 'ol/source/Stamen';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import VectorWFS from 'ol/format/WFS';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import LineString from 'ol/geom/linestring';
import Overlay from 'ol/Overlay';
import Select from 'ol/interaction/select';
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';
import Circle from 'ol/style/circle';
import TextLabel from 'ol/style/Text';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import View from 'ol/view';
import proj from 'ol/proj';

import { MapLayers } from 'src/app/app-core/model/maplayers';
import { LayerChangeArgs } from 'src/app/app-core/event/LayerChangeArgs';
import { TraceRouteArgs } from 'src/app/app-core/event/TraceRouteArgs';
import { MoveMapFixArgs } from 'src/app/app-core/event/MoveMapFixArgs';
import { MoveMapTrkArgs } from 'src/app/app-core/event/MoveMapTrkArgs';

@Component({
  selector: 'app-mapsurface',
  templateUrl: './mapsurface.component.html',
  styleUrls: ['./mapsurface.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSurfaceComponent implements AfterViewInit {
  @Input() maplayers: MapLayers;
  private map: Map;
  private overlay: Overlay;
  private routevector: VectorLayer;
  private featureFix: Feature;
  private featureTrk: Feature;

  private bingkey = 'your-bing-map-key';

  // tslint:disable-next-line:max-line-length
  private wfsurl = 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wfsg01/wfs_sicc102_farmacie?service=WFS&version=1.1.0&request=GetFeature&typename=FarmacieComu&srsname=EPSG%3A3857';

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.initilizeMap();
  }

  layerChange(args: LayerChangeArgs) {
    const layers1 = this.map.getLayers();
    const layers2 = layers1.getArray();

    if (args.layer.typegroup === 'base') {
      for (const layer of layers2) {
        if ((<any>layer).typegroup === 'base') {
          if ((<any>layer).id === args.layer.id) {
            layer.setVisible(true);
          } else {
            layer.setVisible(false);
          }
        }
      }
    }

    if (args.layer.typegroup === 'wms') {
      for (const layer of layers2) {
        if ((<any>layer).typegroup === 'wms') {
          if ((<any>layer).id === args.layer.id) {
            layer.setVisible(args.layer.visible);
          }
        }
      }
    }

    if (args.layer.typegroup === 'wfs') {
      for (const layer of layers2) {
        if ((<any>layer).typegroup === 'wfs') {
          if ((<any>layer).id === args.layer.id) {
            layer.setVisible(args.layer.visible);
          }
        }
      }
    }
  }

  moveMapFix(args: MoveMapFixArgs) {
    const pt1 = args.result.point;
    const pt2 = proj.fromLonLat([pt1.lng, pt1.lat]);
    if (this.featureFix) {
      this.featureFix.setStyle(this.createFixStyle());
      const geom = <Point>this.featureFix.getGeometry();
      geom.setCoordinates(pt2);
    } else {
      const point = new Point(pt2);
      this.featureFix = new Feature(point);
      this.featureFix.setStyle(this.createFixStyle());
      const source = this.routevector.getSource();
      source.addFeature(this.featureFix);
    }
    this.map.getView().setCenter(pt2);
  }

  moveMapTrk(args: MoveMapTrkArgs) {
    const pt1 = args.route.point;
    const pt2 = proj.fromLonLat([pt1.lng, pt1.lat]);
    const i = args.route.index;
    if (this.featureTrk) {
      this.featureTrk.setStyle(this.createTrkStyle(i));
      const geom = <Point>this.featureTrk.getGeometry();
      geom.setCoordinates(pt2);
    } else {
      const point = new Point(pt2);
      this.featureTrk = new Feature(point);
      this.featureTrk.setStyle(this.createTrkStyle(i));
      const source = this.routevector.getSource();
      source.addFeature(this.featureTrk);
    }
    this.map.getView().setCenter(pt2);
  }

  traceRoute(args: TraceRouteArgs) {
    const points = [];
    this.routevector.getSource().clear();
    this.featureFix = undefined;
    this.featureTrk = undefined;
    for (const r of args.result.routespath) {
      points.push(proj.fromLonLat([r.point.lng, r.point.lat]));
    }
    const m = points.length - 1;
    const feature1 = new Feature(new Point(points[0]));
    const feature2 = new Feature(new Point(points[m]));
    const feature3 = new Feature(new LineString(points));
    const source = this.routevector.getSource();
    source.addFeatures([feature1, feature2, feature3]);
  }

  clearMap() {
    this.routevector.getSource().clear();
    this.featureFix = undefined;
    this.featureTrk = undefined;
  }

  //
  //

  private initilizeMap() {
    const layerdata = this.createLayers();

    this.map = new Map({
      target: 'map',
      layers: layerdata.layers,
      view: new View({
        center: proj.fromLonLat([7.66, 45.05]),
        zoom: 12
      })
    });

    const select = new Select({
      layers: [ layerdata.wfsvector ]
    });
    this.overlay = new Overlay({
      element: document.getElementById('popupPanel')
    });
    select.on('select', (event: any) => {
      const selected = event.selected[0];
      if (selected) {
          const pos = this.populateFarmaciePopup(selected);
          this.overlay.setPosition([pos.lng, pos.lat]);
      } else {
          this.overlay.setPosition(undefined);
      }
    });
    this.map.addInteraction(select);
    this.map.addOverlay(this.overlay);
  }

  private createLayers(): any {
    const layers = [];
    const that = this;

    for (const base of this.maplayers.baseLayers) {
      let source: any;
      if (base.group === 'osm') {
        source = new OSM();
      }
      if (base.group === 'bingmaps') {
        source = new BingMaps({
          imagerySet: base.imagerySet,
          key: this.bingkey
        });
      }
      if (base.group === 'stamen') {
        source = new Stamen({
          layer: base.layer,
          cacheSize: 2048
        });
      }
      const layer = new TileLayer({
        visible: base.visible,
        source: source
      });
      (<any>layer).id = base.id;
      (<any>layer).typegroup = base.typegroup;
      (<any>layer).group = base.group;
      layers.push(layer);
    }

    for (const wms of this.maplayers.wmsLayers1) {
      const layer = new TileLayer({
        visible: wms.visible,
        source: new TileWMS({
            url: wms.url,
            params: {
                layers: wms.params.layers,
                transparent: wms.params.transparent
            }
        })
      });
      (<any>layer).id = wms.id;
      (<any>layer).typegroup = wms.typegroup;
      (<any>layer).group = wms.group;
      layers.push(layer);
    }

    for (const wms of this.maplayers.wmsLayers2) {
      const layer = new TileLayer({
        visible: wms.visible,
        source: new TileWMS({
            url: wms.url,
            params: {
                layers: wms.params.layers,
                transparent: wms.params.transparent
            }
        })
      });
      (<any>layer).id = wms.id;
      (<any>layer).typegroup = wms.typegroup;
      (<any>layer).group = wms.group;
      layers.push(layer);
    }

    const wfsformat = new VectorWFS();
    const wfssource = new VectorSource({
      loader: (): any => {
        that.http.get(that.wfsurl, { responseType: 'text' }).subscribe(result => {
          wfssource.addFeatures(wfsformat.readFeatures(result));
        });
      }
    });
    const wfsvector = new VectorLayer({
      style: (feature): any => {
        const zoom = this.map.getView().getZoom();
        const fstyle = this.getFarmacieStyle(zoom, feature);
        return fstyle;
      },
      source: wfssource
    });
    const cfg = this.maplayers.wfsLayers[0];
    (<any>wfsvector).id = cfg.id;
    (<any>wfsvector).typegroup = cfg.typegroup;
    (<any>wfsvector).group = cfg.group;
    layers.push(wfsvector);

    const trcvector = new VectorLayer({
      source: new VectorSource(),
      style: this.createRouteStyle()
    });
    this.routevector = trcvector;
    layers.push(trcvector);

    const layerdata = { layers: layers, wfsvector: wfsvector };
    return layerdata;
  }

  private populateFarmaciePopup(feature: any): any {
    const prop = feature.getProperties();
    document.getElementById('denominazione').textContent = prop.denominazione;
    document.getElementById('indirizzo').textContent = prop.indirizzo;
    document.getElementById('cap').textContent = prop.cap;
    document.getElementById('citta').textContent = prop.citta;
    const geometry = feature.getGeometry();
    const lng = geometry.getCoordinates()[0];
    const lat = geometry.getCoordinates()[1];
    return { lng: lng, lat: lat };
  }

  private getFarmacieStyle(zoom: number, feature: any): Style[] {
    let scale = 0.5;
    let iconfile = '';
    if (zoom >= 15) {
      scale = 0.6;
    }
    if (zoom >= 17) {
      scale = 0.7;
    }
    const prop = feature.getProperties();
    const isnotturna = (prop.notturna === 'NO') ? true : false;
    if (isnotturna === true) {
        iconfile = '/assets/images/farmacia01.png';
    } else {
        iconfile = '/assets/images/farmacia02.png';
    }
    return [
        new Style({
            image: new Icon({
              src: iconfile,
              scale: scale
            })
        })
    ];
  }

  private createRouteStyle(): Style {
    return new Style({
      stroke: new Stroke({
        color: '#007fff',
        width: 3
      }),
      image: new Circle({
        fill: new Fill({
          color: '#0000ff'
        }),
        radius: 5
      })
    });
  }

  private createTrkStyle(index: number): Style {
    return new Style({
      text: new TextLabel({
        text: index.toString(),
        font: '12px "Arial'
      }),
      image: new Circle({
        fill: new Fill({
          color: '#ff0000'
        }),
        radius: 15
      })
    });
  }

  private createFixStyle(): Style {
    return new Style({
      image: new Circle({
        stroke: new Stroke({
          color: '#007f00',
          width: 3
        }),
        radius: 10
      })
    });
  }

}
