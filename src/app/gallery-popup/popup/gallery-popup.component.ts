import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Panzoom from '@panzoom/panzoom'


@Component({
  selector: 'app-gallery-popup',
  templateUrl: './gallery-popup.component.html',
  styleUrls: ['./gallery-popup.component.css']
})
export class GalleryPopupComponent implements OnInit {

  @Input() show: any;
  @Input() showImage: any;
  @Input() Collectionimage: any = [];
  @Output() popUpClose: EventEmitter<any> = new EventEmitter();
  CarouselWidth: any;
  Language = localStorage.getItem('Lang');

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    navText: ["<img src='./assets/images/prev-arrow.png'>", "<img src='./assets/images/next-arrow.png'>"],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 5
      },
      740: {
        items: 5
      },
      940: {
        items: 10
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
    this.CarouselWidth = (this.Collectionimage.length === 1) ? '15%' : (this.Collectionimage.length === 9 ? '95%' :
     this.Collectionimage.length + '0%');
    this.zoom();
  }

  zoom(){
    const element = <HTMLElement> document.getElementById('panzoom');  
    const panzoom = Panzoom(element,  {
    });
    const parent = element?.parentElement
    parent?.addEventListener('wheel', panzoom.zoomWithWheel);
  }

  close() {
    this.show = false;
    this.popUpClose.emit(this.show);
  }

  selectImage(images: any){
    this.showImage = images;
    const element = <HTMLElement> document.getElementById('panzoom');
    const panzoom = Panzoom(element,  {
    });
    const parent = element?.parentElement
    parent?.addEventListener('wheel', panzoom.reset); 
    this.zoom();
  }
}
