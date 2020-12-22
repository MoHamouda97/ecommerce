import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { setHeaders } from './../langHeader';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addRate(body) {
    return this.http.post(`${environment.URLSite}Productrates/addrate.json`, body)
  }

  getAll(product_id, user_id, lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang};     
    return this.http.get(`${environment.URLSite}Productsizes/productdetails/${product_id}/${user_id}.json`, options)
  }

  getRates(product_id) {
    return this.http.get(`${environment.URLSite}Products/ratedetails/${product_id}.json`)
  }
  
  search(body, lang) {
    return this.http.post(`${environment.URLSite}products/searchbyname/${lang}/0.json`, body)
  }

  GetFooterIcons() {
    return this.http.get<any>(`${environment.URLSite}users/getcontacts.json`)
  }

  getStorProducts(id, page, lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang};     
    return this.http.get(`${environment.URLSite}products/getproductsbycatid/${id}/0/${page}.json`, options)
  }
}
