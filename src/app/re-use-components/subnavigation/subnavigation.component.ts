import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'subnavigation',
  templateUrl: './subnavigation.component.html',
  styleUrls: ['./subnavigation.component.css']
})
export class SubnavigationComponent implements OnInit {

  @Input() condition: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCLickRoute(value: any){
    if(this.condition == 'Home'){
      if(value == 'Car'){
        this.router.navigate(['/Vehicle']);
      }else{
        this.router.navigate(['/Properties'], { queryParams: { PropertyType: value } });
      }
    }else{
      this.router.navigate(['/selectcategoryads'], { queryParams: { PropertyType: value } });
    }
    
  }

}
