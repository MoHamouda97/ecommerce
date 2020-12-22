import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('products') products = [];
  @Input('temp') temp;
  
  constructor() { }

  ngOnInit(): void {
  }

//#region Dealing with currancy  

  getCurrencyName(){
    if (localStorage.getItem('currencySign') == 'دينار العراقي' && localStorage.getItem('lang') == 'en') {
      return 'IQ';
    }
    return localStorage.getItem('currencySign');
  }

  getCurrencyvalue() {
    return parseFloat(localStorage.getItem('currencyValue'));
  }

//#endregion  

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  } 
  
//#endregion

}
