import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-termsandcondition',
  templateUrl: './termsandcondition.component.html',
  styleUrls: ['./termsandcondition.component.css']
})
export class TermsandconditionComponent implements OnInit {

  Language: string = environment.Language;
  constructor() {
    this.Language = (environment.Language == 'ar') ? 'text-right' : 'text-justify';
    window.scroll(0,0);
  }

  ngOnInit(): void {
  }

}
