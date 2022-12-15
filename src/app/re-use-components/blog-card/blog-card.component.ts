import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  @Input() newsfeed: any;
  @Input() customClass: any;

  constructor() { }

  ngOnInit(): void {
  }

  

}
