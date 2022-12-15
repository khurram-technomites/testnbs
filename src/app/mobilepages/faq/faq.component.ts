import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  datas: any = [];
  Language = localStorage.getItem('Lang');

  constructor(private _activatedRoute: ActivatedRoute) {
    this.datas = [
      {
        id: 1,
        question: 'Who are we?',
        answer: '<b> NowBuySell </b> enables the sports choice to all individuals irrespective of their identities. It connects customers (individuals and corporates) with partners (sport venues, coaches, trainers and sport equipment suppliers).'
      },
      {
        id: 2,
        question: 'What is NowBuySell offering?',
        answer: `<b> NowBuySell </b> is a community that is built on the commitment to provide a platform of choice to all individuals and groups aspiring to pursue a sport of their choice. The platform inculcates a culture of positive energy and enthusiasm with the moto ‘Sports for All, All for Sports’. <br/> Customers are welcome to use this platform to search and discover sporting venues, book for an individual or a group to enjoy our numerous services, read and write reviews, order sport equipment and make payments. <br/> Following features and services under this one-stop application. <ul class="list-disc my-4 px-10"> 
        <li> <b> Discover and Book venues </b> according to your preference.</li>
        <li> <b> Find Playpals</b> to play with your Friends.</li>
        <li> <b> Rate Playpals</b> and <b>Track playing stats </b> against all your activities.</li>
        <li> <b> Engage </b> with people and discuss about sports and related stuff.</li>
        <li> <b> Find coaching academies </b> and <b>top class trainers.</b></li>
        <li> <b> Participate in tournaments  </b> and sport events.</li>
        </ul>`
      },
    ]
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((response) => {
      scroll(0, 0)
    })
  }

  visibleIndex: any = -1;
  showSubItem(ind: any) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  deg: any = '';
  test(value: any) {
    if (this.deg == 'rotate(180deg)') {
      this.deg = value.querySelector('div > svg').style.transform = 'rotate(0deg)';
    }
    else { this.deg = value.querySelector('div > svg').style.transform = 'rotate(180deg)'; }
  }

}
