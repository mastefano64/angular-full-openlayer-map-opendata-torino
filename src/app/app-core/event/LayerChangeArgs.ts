import { IBaseLayers } from '../interface/IBaseLayer';
import { IWmsLayers } from '../interface/IWmsLayer';

export class LayerChangeArgs {
    constructor(public layer: IBaseLayers | IWmsLayers) {}
}
