import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.css']
})
export class TextComponentComponent implements OnInit {

  @Input() inputText: any = '';
  @Input() customClass: any;
  @Input() condition: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
