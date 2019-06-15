import { IBaseLayers } from '../interface/IBaseLayer';
import { IWmsLayers } from '../interface/IWmsLayer';
import { IWfsLayers } from '../interface/IWfsLayer';

export class MapLayers {
    baseLayers: IBaseLayers[];
    wmsLayers1: IWmsLayers[];
    wmsLayers2: IWmsLayers[];
    wfsLayers: IWfsLayers[];
}
