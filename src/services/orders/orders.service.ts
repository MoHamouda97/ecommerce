import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment'
import { setHeaders } from '../langHeader';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  getOrders(userID, lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang};           
    return this.http.get(`${environment.URLSite}orders/getuserorder/${userID}.json`, options);
  }
}
