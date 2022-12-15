import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  newsfeeds: any;
  pgno: number = 1;
  pagesize: number = 8;
  disbalebtn: boolean = false;
  loadContent: boolean = false;

  Language = localStorage.getItem('Lang');
  heroData: any = {
    heading: 'Blog.Blog',
    breadCrumbs1: 'Header.Home',
    breadCrumbs2: 'Blog.Blog',
    route1: '/home',
    route2: '/blogs',
    thirdCondition: false
  }

  constructor(private _blogs: BlogsService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
    })

    this._blogs.FetchOnePageBlogs(1, this.pagesize).subscribe((response: any) => {
      this.newsfeeds = response.newsfeeds;
      this.loadContent = true;
    })
  }

  LoadMore() {
    this.pgno += 1;
    this._blogs.FetchOnePageBlogs(this.pgno, this.pagesize).subscribe((response: any) => {
      response.newsfeeds.forEach((x: any) => {
        this.newsfeeds.push(x);
      });
      response.newsfeeds.length < this.pagesize ? this.disbalebtn = true : this.disbalebtn = false;
    })
  }

  counterForLoading(i: number) {
    return new Array(i);
  }
}
