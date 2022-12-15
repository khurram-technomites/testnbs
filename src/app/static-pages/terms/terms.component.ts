import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  Language: string = environment.Language;
  constructor() {
    this.Language = (environment.Language == 'ar') ? 'text-right' : 'text-justify';
    window.scroll(0,0);
  }

  ngOnInit(): void {
  }

}
