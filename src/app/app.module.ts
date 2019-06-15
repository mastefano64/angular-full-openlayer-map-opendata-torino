import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app.material.module';
import { AppCoreModule } from './app-core/app.core.module';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { MapContainerComponent } from './mappe/mapcontainer/mapcontainer.component';
import { MapSurfaceComponent } from './mappe/mapsurface/mapsurface.component';
import { MapSideLayerComponent } from './mappe/mapsidelayer/mapsidelayer.component';
import { MapSideRouteComponent } from './mappe/mapsideroute/mapsideroute.component';
import { RouteButtonComponent } from './shared/routebutton/routebutton.component';
import { TestComponent } from './mappe/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    MapSurfaceComponent,
    MapSideLayerComponent,
    MapSideRouteComponent,
    RouteButtonComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    AppCoreModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
