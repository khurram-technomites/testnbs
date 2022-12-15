import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {

  headerData: any;
  img: any;
  load: any;

  constructor(private router: Router, private _helper: HelperService) {
    this._helper.WebsiteHeader().subscribe((response: any) => {
      this.headerData = response.header[0];
      this.img = this.headerData.url;
      this.load = true;
    })
  }

  ngOnInit(): void {
    
  }
  

  GoToPropertyHome() {
    this.router.navigateByUrl('/Properties');
  }

  GoToVehicleHome() {
    this.router.navigateByUrl('/Vehicle');
  }

}
