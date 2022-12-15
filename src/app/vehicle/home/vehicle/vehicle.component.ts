import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit {
  VehicleMainHeading = "PropertyPage.Featured.MainHeading";
  VehicleSubHeading = "PropertyPage.Featured.SubHeading";

  constructor() {
    scroll(0, 0)
  }

  ngOnInit(): void {
  }

}
