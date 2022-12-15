import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  Endpoint = 'http://nowbuysell.dwtdemo.com/';
  CounterUrl = `${environment.baseUrl}api/v1/listingStats`;

  constructor(private http:HttpClient) { }

  FetchCounter()
  {
    return this.http.get(this.CounterUrl)
  }
}
