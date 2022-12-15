import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class BlogsService {

  Endpoint = environment.baseUrl;
  slug: any;
  pgno: number = 1;
  pagesize: number = 8;

  constructor(private http: HttpClient) { }

  FetchBlogs(module: string) {
    let blogsUrl = `${this.Endpoint}api/v1/${environment.Language}/newsfeed/?pgno=0&pagesize=16${module}`;
    return this.http.get(blogsUrl);
  }

  FetchOnePageBlogs(pgno: any, pagesize: any) {

    this.pgno = pgno;
    this.pagesize = pagesize;
    return this.http.get(`${this.Endpoint}api/v1/${localStorage.getItem('Lang')}/newsfeed/?pgno=${this.pgno}&pagesize=${this.pagesize}`)
  }

  FetchSingleBlog(slug: any) {
    let SingleBlogsUrl = `${this.Endpoint}api/v1/${environment.Language}/newsfeed/`;
    return this.http.get(SingleBlogsUrl + slug);
  }
}
