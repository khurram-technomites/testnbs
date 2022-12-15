import { Component, Input, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-gallery-img-popup',
  templateUrl: './gallery-img-popup.component.html',
  styleUrls: ['./gallery-img-popup.component.css']
})
export class GalleryImgPopupComponent implements OnInit {

  @Input() Collectionimage: any = [];
  @Output() popUpClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.popUpClose.emit(false);
    document.body.style.overflow = 'scroll';
  }
  

}
