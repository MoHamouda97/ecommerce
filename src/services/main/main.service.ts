import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { setHeaders } from './../langHeader';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getAll(lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang};    
    return this.http.get(`${environment.URLSite}productsizes/mainpage.json`, options);
  }

  getAllTest(lang){
    let headers1 = setHeaders(lang);
    let options = {headers:headers1};      
    return this.http.get(`${environment.URLSite}productsizes/mainpage.json`, options);
  }

  getCurrencies() {
    return this.http.get(`${environment.URLSite}Currencies/currency.json`);
  }
}
