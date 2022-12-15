import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogsService } from 'src/app/services/blogs.service';
import { HelperService } from 'src/app/services/helper.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-app-blogs-thumbnail',
  templateUrl: './app-blogs-thumbnail.component.html',
  styleUrls: ['./app-blogs-thumbnail.component.css']
})
export class AppBlogsThumbnailComponent implements OnInit {

  @Input() componentName: any;
  contentLoaded = false;
  newsfeeds: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 13,
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
        items: 5
      }
    },
    nav: false
  }

  constructor(private _blogs: BlogsService, private router: Router, private _helper: HelperService,private _vehicles: VehiclesService) {
  }

  ngOnInit(): void {
    if(this.componentName == 'homeSection'){
      this._blogs.FetchBlogs('').subscribe((response: any) => {
        this.newsfeeds = response.newsfeeds
        this.contentLoaded = true;
      })
    }
    if(this.componentName == 'propertyHome'){
      this._blogs.FetchBlogs('&module=property').subscribe((response: any) => {
        this.newsfeeds = response.newsfeeds
        this.contentLoaded = true;
      })
    }
    if(this.componentName == 'vehicleHome'){
      this._vehicles.FetchBlogs().subscribe((response: any) => {
        this.newsfeeds = response.newsfeeds
        this.contentLoaded = true;
      })
    }
  }
  
  _BlogService() {
    this._helper.reloadComponent(this.router.url);
  }

  counterForLoading(i: number)
  {
    return new Array(i);
  }

}
