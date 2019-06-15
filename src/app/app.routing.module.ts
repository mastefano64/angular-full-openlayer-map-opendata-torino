import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapContainerComponent } from './mappe/mapcontainer/mapcontainer.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: MapContainerComponent },
  { path: '**', redirectTo: 'map' }
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
