import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { setHeaders } from './../langHeader';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(id, user_id, page, lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang};     
    return this.http.get<any>(`${environment.URLSite}products/getproductsbycatid/${id}/${user_id}/${page}.json`, options);
  }
  
  getStors(id, type, lang) {
    let headerLang = setHeaders(lang);
    let options = {headers:headerLang}; 
    
    return this.http.get(`${environment.URLSite}smallstores/getsmallstoredata/${id}/${type}.json`, options)
  }

}

// @GET("products/getproductsbycatid/{id}/{user_id}/{page}.json")
// smallstores/getsmallstoredata/{id}/{type}