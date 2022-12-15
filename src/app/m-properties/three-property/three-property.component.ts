import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faBath } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { PropertiesService } from 'src/app/services/properties.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-three-property',
  templateUrl: './three-property.component.html',
  styleUrls: ['./three-property.component.css']
})
export class ThreePropertyComponent implements OnInit {

  contentLoaded = false;
  propertiesThumbnail:any;
  faBed=faBed;
  faBath=faBath;
  faCar=faCar;
  faRulerCombined=faRulerCombined;
  faHeart=faHeart;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 10,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  constructor(private router: Router, private _properties:PropertiesService) {}

  ngOnInit(): void {
    this._properties.FetchThreeProperties().subscribe((response:any)=>{
      this.propertiesThumbnail = response.data
      this.contentLoaded = true;
    }),
    (badResponse:any)=>
    {
      console.log(badResponse)
    }
  }

  counterForLoading(i: number)
  {
    return new Array(i);
  }

}