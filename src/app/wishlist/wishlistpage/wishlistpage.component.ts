import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlistpage',
  templateUrl: './wishlistpage.component.html',
  styleUrls: ['./wishlistpage.component.css']
})
export class WishlistpageComponent implements OnInit {
  car="car";
  property="property";

  constructor() { }

  ngOnInit(): void {
  }

}
