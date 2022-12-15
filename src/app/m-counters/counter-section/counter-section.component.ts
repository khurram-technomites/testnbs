import { Component, OnInit } from '@angular/core';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-counter-section',
  templateUrl: './counter-section.component.html',
  styleUrls: ['./counter-section.component.css']
})
export class CounterSectionComponent implements OnInit {


  propertiesForSale: number = 0;
  carsForSale: number = 0;
  propertiesForRent: number = 0;
  communityMembers: number = 0;

  constructor(private _counter: CounterService) { }

  ngOnInit(): void {
    this.GetCounter()
  }

  propertiesForSaleStop: any = setInterval(() => {
    if (this.propertiesForSale == this.propertiesForSale) {
      clearInterval(this.propertiesForSaleStop);
    }
  }, 1000);

  carsForSaleStop: any = setInterval(() => {
    if (this.carsForSale == this.carsForSale) {
      clearInterval(this.carsForSaleStop);
    }
  }, 1000);

  propertiesForRentStop: any = setInterval(() => {
    if (this.propertiesForRent == this.propertiesForRent) {
      clearInterval(this.propertiesForRentStop);
    }
  }, 1000);

  communityMembersStop: any = setInterval(() => {
    if (this.communityMembers == this.communityMembers) {
      clearInterval(this.communityMembersStop);
    }
  }, 1000);

  GetCounter() {
    this._counter.FetchCounter().subscribe((response: any) => {
      this.propertiesForSale = response.stats.propertiesForSale
      this.carsForSale = response.stats.carsForSale
      this.propertiesForRent = response.stats.propertiesForRent
      this.communityMembers = response.stats.communityMembers
    }),
      (badResponse: any) => {
        console.log(badResponse)
      }
  }
}
