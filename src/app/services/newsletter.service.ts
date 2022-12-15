import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private http: HttpClient, private router: Router) { 
    this.previousUrl = '';
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  ForNewLetter(data: any) {
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    const body: any = {
      "EmailID": data.newsField,
    }

    let NewLetterUrl = `${environment.baseUrl}api/v1/newsletter?lang=${environment.Language}`;
    return this.http.post(NewLetterUrl, body, TypeOf)
  }

  public getPreviousUrl() {
    return this.previousUrl;
  } 
}
