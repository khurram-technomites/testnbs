import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs.service';
import { environment } from 'src/environments/environment';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  heroData: any = {
    heading: 'Blog.BlogsDetail',
    breadCrumbs1: 'Header.Home',
    breadCrumbs2: 'Blog.Blog',
    breadCrumbs3: 'Blog.BlogsDetail',
    route1: '/home',
    route2: '/blogs',
    thirdCondition: true
  }

  newsfeeds: any = {};
  Language: string = environment.Language;
  VideoOrImage: boolean = false;

  faPlay = faPlay;
  faPause = faPause;
  video:any;
  PlayBtnShow: boolean = false;
  controlsbtn: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private _blogs: BlogsService) {
  }

  ngOnInit(): void {
    this.Language = (environment.Language == 'ar') ? 'text-right' : 'text-justify'

    this.activatedRoute.paramMap.subscribe((param) => {
      const slug: any = param.get('slug')
      this._blogs.FetchSingleBlog(slug).subscribe((response: any) => {
        this.newsfeeds = response.newsfeed;
        this.video = this.newsfeeds.video;
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    })
  }

  ChangeButton() {
    //Catching Video Events to hide unhide control buttons
    let video = <HTMLElement>document.getElementById('myVideo');
    // Playing event
    video.addEventListener("playing", function () {
    });
    // // Pause event
    video.addEventListener("pause", function () {
    });
  }

  PlayPause(myVideo: any) {
    if (myVideo.paused) {
      myVideo.play();
      this.PlayBtnShow = true;
      this.controlsbtn = true;
    }
    else {
      myVideo.pause();
      this.PlayBtnShow = false;
      this.controlsbtn = false;
    }
  }
}
