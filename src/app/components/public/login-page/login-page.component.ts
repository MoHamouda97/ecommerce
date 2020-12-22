import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    $('.top-header, .middle-header, .main-nav, .main-footer, .top-nav').hide();
  }

  ngOnDestroy(): void {
    $('.top-header, .middle-header, .main-nav, .main-footer, .top-nav').show(); 
    localStorage.removeItem('returnUrl');   
  } 

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

}
