import { CommonModule } from '@angular/Common';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorsHandler } from './error/errorshandler';

import { CacheService } from './service/cache-service';
import { LayersService } from './service/layers-service';
import { GeoService } from './service/geo-service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorsHandler },
    CacheService,
    LayersService,
    GeoService
  ]
})
export class AppCoreModule { }
