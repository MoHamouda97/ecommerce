import { Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems;
  prices;
  lang;

  constructor(private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 

    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.prices = (localStorage.getItem('prices')) 
      ? JSON.parse(localStorage.getItem('prices')).reduce((a, b) => a + b, 0)
      : 0; 
      
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;  
  }

//#region Dealing with currency

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

//#region Items quantity

  increaseOrDecreaseQuantity(index, num) { 
    let prices = JSON.parse(localStorage.getItem('prices'));

    this.cartItems[index].quantity += (num);
    this.cartItems[index].amount += (num);

    prices[index] = this.cartItems[index].price * this.cartItems[index].quantity;
    this.prices = prices.reduce((a,b) => a + b, 0);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('prices', JSON.stringify(prices));

    if (this.cartItems[index].quantity === 0) {
      this.cartItems.splice(index, 1);
      prices.splice(index, 1);

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      localStorage.setItem('prices', JSON.stringify(prices));      
    }
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  } 

//#endregion

}
