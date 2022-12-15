import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-place-your-order',
  templateUrl: './place-your-order.component.html',
  styleUrls: ['./place-your-order.component.css']
})
export class PlaceYourOrderComponent implements OnInit {
  faCircle = faCircle;
  access_token: any;

  constructor(private toastr: ToastrService, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token')
      if (this.access_token) {
        scroll(0, 0)
      } else {
        this.toastr.error('Opps! You Are Not Login!')
        this.router.navigateByUrl('/home')
      }
    
  }

}
