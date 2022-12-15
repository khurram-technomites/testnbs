import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customersupport',
  templateUrl: './customersupport.component.html',
  styleUrls: ['./customersupport.component.css']
})
export class CustomersupportComponent implements OnInit {

  Language: string = environment.Language;
  constructor() {
    this.Language = (environment.Language == 'ar') ? 'text-right' : 'text-justify';
    window.scroll(0, 0);
  }

  ngOnInit(): void {
  }

}
