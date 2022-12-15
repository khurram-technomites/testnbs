import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponentMobile implements OnInit {

  Language: string = environment.Language;
  constructor() {
    this.Language = (environment.Language == 'ar') ? 'text-right' : 'text-justify';
    window.scroll(0,0);
  }

  ngOnInit(): void {
  }
}
