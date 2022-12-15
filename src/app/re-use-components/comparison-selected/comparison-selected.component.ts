import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparison-selected',
  templateUrl: './comparison-selected.component.html',
  styleUrls: ['./comparison-selected.component.css']
})
export class ComparisonSelectedComponent implements OnInit {

  @Input() SelectedCardData: any;
  @Input() componentName: any;
  @Output() closePopup = new EventEmitter();
  Language = localStorage.getItem('Lang');

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  close(){
    this.closePopup.emit(false);
  }

  openDetailPage(slug: any){
    if(this.componentName == 'motors'){
      this._router.navigate(['/vehicles', slug]);
    }else{
      this._router.navigate(['/property', slug]);
    }
  }

}
