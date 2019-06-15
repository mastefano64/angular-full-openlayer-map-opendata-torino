import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-routebutton',
  templateUrl: './routebutton.component.html',
  styleUrls: ['./routebutton.component.css']
})
export class RouteButtonComponent implements OnInit {
  @Input() routemode: string;
  @Output() modechanged = new EventEmitter<string>();
  icodriving: string;
  icowalking: string;

  constructor() {}

  ngOnInit() {
    if (this.routemode === 'd') {
      this.icodriving = './assets/images/icon-drivingY.svg';
      this.icowalking = './assets/images/icon-walkingN.svg';
    } else {
      this.icodriving = './assets/images/icon-drivingN.svg';
      this.icowalking = './assets/images/icon-walkingY.svg';
    }
  }

  onSelectIco(mode: string) {
    this.routemode = mode;
    if (this.routemode === 'd') {
      this.icodriving = './assets/images/icon-drivingY.svg';
      this.icowalking = './assets/images/icon-walkingN.svg';
    } else {
      this.icodriving = './assets/images/icon-drivingN.svg';
      this.icowalking = './assets/images/icon-walkingY.svg';
    }
    this.modechanged.emit(this.routemode);
  }

}
