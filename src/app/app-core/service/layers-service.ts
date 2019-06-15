import { Injectable } from '@angular/core';

import { IBaseLayers } from '../interface/IBaseLayer';
import { IWmsLayers } from '../interface/IWmsLayer';
import { IWfsLayers } from '../interface/IWfsLayer';

@Injectable()
export class LayersService {

  constructor() {}

  getBaseLayers(): IBaseLayers[] {
    const layers = [];

    layers.push({
      id: 'layer0',
      typegroup: 'base',
      group: 'osm',
      displayName: 'OpenStreetMap',
      visible: true
    });
    layers.push({
      id: 'layer1',
      typegroup: 'base',
      group: 'bingmaps',
      displayName: 'BingMaps Road',
      visible: false,
      imagerySet: 'Road',
    });
    layers.push({
      id: 'layer2',
      typegroup: 'base',
      group: 'bingmaps',
      displayName: 'BingMaps Aerial no Labels',
      visible: false,
      imagerySet: 'Aerial',
    });
    layers.push({
      id: 'layer3',
      typegroup: 'base',
      group: 'bingmaps',
      displayName: 'BingMaps Aerial and Labels',
      visible: false,
      imagerySet: 'AerialWithLabels',
    });
    layers.push({
      id: 'layer4',
      typegroup: 'base',
      group: 'stamen',
      displayName: 'Stamen',
      visible: false,
      layer: 'toner'
    });

    return layers;
  }

  getWmsLayers1(): IWmsLayers[] {
    const layers = [];

    layers.push({
      id: 'layer11',
      typegroup: 'wms',
      group: 'group1',
      displayName: 'Aree (colori)',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc01_dati_di_base?',
      params: {
        layers: 'DatiDiBase',
        transparent: true
      }
    });
    layers.push({
      id: 'layer12',
      typegroup: 'wms',
      group: 'group1',
      displayName: 'Aree (bianco/nero)',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc31_carta_tecnica_bn?',
      params: {
        layers: 'CartaTecnicaBn',
        transparent: true
      }
    });
    layers.push({
      id: 'layer13',
      typegroup: 'wms',
      group: 'group1',
      displayName: 'Catasto urbano',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc17bis_catasto_urbano?',
      params: {
        layers: 'CatastoUrbano',
        transparent: true
      }
    });
    layers.push({
      id: 'layer14',
      typegroup: 'wms',
      group: 'group1',
      displayName: 'Particelle fabbricati',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc16bis_catasto_terreni?',
      params: {
        layers: 'CatastoTerreni',
        transparent: true
      }
    });

    return layers;
  }

  getWmsLayers2(): IWmsLayers[] {
    const layers = [];

    layers.push({
      id: 'layer21',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Aree verdi',
      visible: true,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc12_aree_verdi?',
      params: {
        layers: 'AreeVerdi',
        transparent: true
      }
    });
    layers.push({
      id: 'layer22',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Cimiteri',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc109_cimiteri?',
      params: {
        layers: 'Cimiteri',
        transparent: true
      }
    });
    layers.push({
      id: 'layer23',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Impianti sportivi',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc123_impiantisportivi?',
      params: {
        layers: 'ImpiantiSportivi',
        transparent: true
      }
    });
    layers.push({
      id: 'layer24',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Mercati',
      visible: false,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc41_mercati?',
      params: {
        layers: 'Mercati',
        transparent: true
      }
    });
    layers.push({
      id: 'layer25',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Aberate',
      visible: true,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc11_alberate?',
      params: {
        layers: 'Alberate',
        transparent: true
      }
    });
    layers.push({
      id: 'layer26',
      typegroup: 'wms',
      group: 'group2',
      displayName: 'Ospedali',
      visible: true,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc112_ospedali?',
      params: {
        layers: 'Ospedali',
        transparent: true
      }
    });

    return layers;
  }

  getWfsLayers(): IWfsLayers[] {
    const layers = [];

    layers.push({
      id: 'layer31',
      typegroup: 'wfs',
      group: 'group3',
      displayName: 'Farmacie',
      visible: true,
      url: 'http://geomap.reteunitaria.piemonte.it/ws/siccms/coto-01/wmsg01/wms_sicc102_farmacie?',
      params: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typename: 'FarmacieComu',
        srsname: 'EPSG:3857'
      }
    });

    return layers;
  }

}
