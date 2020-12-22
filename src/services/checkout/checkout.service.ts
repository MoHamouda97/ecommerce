import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { options } from './../options';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${environment.URLSite}countries.json`)
  }

  addOrder(body) {
    return this.http.post(`${environment.URLSite}Orders/addorder.json`, body, options)
  }
}
