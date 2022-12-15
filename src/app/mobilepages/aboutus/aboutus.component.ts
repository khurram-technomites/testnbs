import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  contentLoaded: boolean = false;
  cardLoaded: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
    })
  }

  ngAfterContentInit(): void {

    this.contentLoaded = true;
    setTimeout(() => {
      this.cardLoaded = true;
      if (environment.Language == 'ar') {
        let contentelem1 = document.querySelector('.content1');
        contentelem1?.classList.add('flex-row-reverse');
        let contentelem2 = document.querySelector('.content2');
        contentelem2?.classList.add('text-right');
      } else {
        let contentelem1 = document.querySelector('.content1');
        contentelem1?.classList.remove('flex-row-reverse');
        let contentelem2 = document.querySelector('.content2');
        contentelem2?.classList.remove('text-right');
      }
    }, 200);

  }

}
