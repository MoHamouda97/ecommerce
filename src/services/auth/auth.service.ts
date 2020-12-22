import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { options } from './../options';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  login(body){
    return this.http.post(`${environment.URLSite}users/token.json`, body);
  } 
  
  register(body){
    return this.http.post(`${environment.URLSite}users/add.json`, body);
  } 
  
  changePwp(id, body) {
    
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`      
  });

 const options = {headers: headers};  
    console.log(localStorage.getItem('token'))
    return this.http.post(`${environment.URLSite}users/changepassword/${id}.json`, body, options);
  }

  changeInfo(id, body) {  

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`      
  });

  const options = {headers: headers};
    return this.http.post(`${environment.URLSite}users/edit/${id}.json`, body, options);
  }
  
  getUserById(id) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + `${localStorage.getItem('token')}`      
    });
    const options = {headers: headers};
    return this.http.get(`${environment.URLSite}users/view/${id}.json`, options)
  }
  
  getPwp(body) {
    return this.http.post(`${environment.URLSite}users/forgotPassword.json`, body);
  }
}
