import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrls: ['./aboutus-page.component.css']
})
export class AboutusPageComponent implements OnInit {

  aboutHeroData: any = {
    heading: 'AboutUsPage.AboutUsPageBanner.AboutUs',
    breadCrumbs1: 'Header.Home',
    breadCrumbs2: 'AboutUsPage.AboutUsPageBanner.AboutUs',
    route1: '/home',
    route2: '/aboutus',
    thirdCondition: false
  }
  Language = localStorage.getItem('Lang');

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
    })
  }

}
