import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MapLayers } from 'src/app/app-core/model/maplayers';
import { LayerChangeArgs } from 'src/app/app-core/event/LayerChangeArgs';

@Component({
  selector: 'app-mapsidelayer',
  templateUrl: './mapsidelayer.component.html',
  styleUrls: ['./mapsidelayer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSideLayerComponent implements OnInit  {
  @Input() maplayers: MapLayers;
  @Output() layerchange = new EventEmitter<LayerChangeArgs>();
  layerId: string;

  constructor() {}

  ngOnInit() {
    let layers = this.maplayers.baseLayers;
    layers = layers.filter(b => b.visible === true);
    this.layerId = layers[0].id;
  }

  onBaseLayerChange() {
    let layers = this.maplayers.baseLayers;
    layers  = layers.filter(b => b.id === this.layerId);
    const args = new LayerChangeArgs(layers[0]);
    this.layerchange.emit(args);
  }

  onLayerChange(layer: any) {
    const args = new LayerChangeArgs(layer);
    this.layerchange.emit(args);
  }

}
