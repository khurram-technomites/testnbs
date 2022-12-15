import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  @Input() heroSectionData: any;
  @Input() customClass: any;
  @Input() customClass2: any;
  Language = localStorage.getItem('Lang');

  constructor() { }

  ngOnInit(): void {
  }

}
