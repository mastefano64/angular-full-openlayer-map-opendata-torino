import { Component, ViewChild } from '@angular/core';

import { MapLayers } from 'src/app/app-core/model/maplayers';
import { MapSurfaceComponent } from '../mapsurface/mapsurface.component';
import { LayerChangeArgs } from 'src/app/app-core/event/LayerChangeArgs';
import { MoveMapFixArgs } from 'src/app/app-core/event/MoveMapFixArgs';
import { MoveMapTrkArgs } from 'src/app/app-core/event/MoveMapTrkArgs';
import { TraceRouteArgs } from 'src/app/app-core/event/TraceRouteArgs';
import { LayersService } from 'src/app/app-core/service/layers-service';

@Component({
  selector: 'app-mapcontainer',
  templateUrl: './mapcontainer.component.html',
  styleUrls: ['./mapcontainer.component.css']
})
export class MapContainerComponent {
  @ViewChild(MapSurfaceComponent) sidepanel;
  maplayers: MapLayers;
  panel = 'pane1';
  opened = false;

  constructor(private service: LayersService) {
    const grp = new MapLayers();
    grp.baseLayers = service.getBaseLayers();
    grp.wmsLayers1 = service.getWmsLayers1();
    grp.wmsLayers2 = service.getWmsLayers2();
    grp.wfsLayers = service.getWfsLayers();
    this.maplayers = grp;
  }

  onToggle(panel: string) {
    this.panel = panel;
  }

  onLayerChange(args: LayerChangeArgs) {
    this.sidepanel.layerChange(args);
  }

  onMoveMapFix(args: MoveMapFixArgs) {
    this.sidepanel.moveMapFix(args);
  }

  onMoveMapTrk(args: MoveMapTrkArgs) {
    this.sidepanel.moveMapTrk(args);
  }

  onTraceRoute(args: TraceRouteArgs) {
    this.sidepanel.traceRoute(args);
  }

  onClearMap() {
    this.sidepanel.clearMap();
  }

}
