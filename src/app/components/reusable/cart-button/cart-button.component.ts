import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {
  @Input('product') product;
  @Input('temp') temp;
  @Input('isNewLoad') isNewLoad = false;
  data;
  cartItems;
  prices;
  lang;
  isAdded = false;
  
  @HostListener("click", ["$event"])
    public onClick(event: any): void{
      event.stopPropagation();
    }
      
  constructor(private notification: NzNotificationService, private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;
    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );

    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Add to cart

  addToCart($event, product){ 
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var prices = JSON.parse(localStorage.getItem('prices')) || [];

    $event.preventDefault();

    this.data = product;    

    if (this.temp == 'bestseller') {
      this.cartItems = {
        "name": this.data.product.name,
        "image": this.data.product.img,
        "quantity": 1,
        "size": this.data.size,
        "price": this.data.start_price,
        "productsize_id": this.data.id,
        "amount": 1
      }
      
      this.prices = this.data.start_price;
      this.isAdded = true;

      cartItems.push(this.cartItems);
      prices.push(this.prices);      
    } else if (this.temp == 'offer') {
      var productPrice =   (((this.data.product.productsizes[0].current_price) )  -  (this.data.product.productsizes[0].current_price  * this.data.percentage) / 100 )
      this.cartItems = {
        "name": this.data.product.name,
        "image": this.data.product.img,
        "quantity": 1,
        "size": this.data.product.productsizes[0].size,
        "price": productPrice ,
        "productsize_id": this.data.id,
        "amount": 1        
      }

      this.prices = productPrice;
      this.isAdded = true;      

      cartItems.push(this.cartItems);
      prices.push(this.prices);       
    } else if (this.temp == 'cat') {
      this.cartItems = {
        "name": this.data.name,
        "image": this.data.img,
        "quantity": 1,
        "size": this.data.productsizes[0].size,
        "price": this.data.productsizes[0].current_price,
        "productsize_id": this.data.productsizes[0].id,
        "amount": 1            
      };    

      this.prices = this.data.productsizes[0].current_price;
      this.isAdded = true;            

      cartItems.push(this.cartItems);
      prices.push(this.prices); 
    } else if (this.temp == 'related') {
      this.cartItems = {
        "name": this.data.name,
        "image": this.data.img,
        "quantity": 1,
        "size": this.data.productsizes[0].size,
        "price": this.data.productsizes[0].current_price,
        "productsize_id": this.data.productsizes[0].id,
        "amount": 1           
      }    

      this.prices = this.data.productsizes[0].current_price;
      this.isAdded = true;           

      cartItems.push(this.cartItems);
      prices.push(this.prices); 
    } else if (this.temp == 'new') {
      this.cartItems = {
        "name": this.data.name,
        "image": this.data.img,
        "quantity": 1,
        "size": this.data.productsizes[0].size,
        "price": this.data.productsizes[0].current_price,
        "productsize_id": this.data.productsizes[0].id,
        "amount": 1          
      }      

      this.prices = this.data.productsizes[0].current_price;
      this.isAdded = true;      

      cartItems.push(this.cartItems);
      prices.push(this.prices);       
    } else {
      if (localStorage.getItem('size')) {
        this.cartItems = {
          "name": this.data[0].name,
          "image": this.data[0].img,
          "quantity": 1,
          "size": localStorage.getItem('size'),
          "price": localStorage.getItem('sizePrice'),
          "productsize_id": localStorage.getItem('productsize_id'),
          "amount": 1            
        }

        this.prices = parseFloat(localStorage.getItem('sizePrice'));
        this.isAdded = true;

        cartItems.push(this.cartItems);
        prices.push(this.prices); 
        
        localStorage.setItem('isProductPage', 'true');
      } else {
        let options;
        if(this.getLang() == 'ar') {
          this.notification.warning(
            'اضافة منتج',
            'بالرجاء اختيار حجم المنتج قبل اضافته الى السله'
          );
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.warning(
            'Add Product',
            'Please select product size before adding it to cart',
            options
          );         
        }         
      }     
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('prices', JSON.stringify(prices));
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  } 

//#endregion

}
