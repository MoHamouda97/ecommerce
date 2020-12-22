import { CheckoutService } from 'src/services/checkout/checkout.service';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as lang from './../../../../settings/lang';
import { DatabindingService } from 'src/services/databinding.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  radioValue = 'paypal';
  cartItems;
  prices;
  payPalConfig?: IPayPalConfig;
  loader = false;
  bool = false;
  lang;

  constructor(
    private service: CheckoutService,
    private notification: NzNotificationService,
    private router: Router,
    private binding: DatabindingService,) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

    //this.initConfig();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
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

//#region Currancy

  getCurrencyName(){
    if (localStorage.getItem('currencySign') == 'ريال عماني' && localStorage.getItem('lang') == 'en') {
      return 'OMR';
    }
    return localStorage.getItem('currencySign');
  }

  getCurrencyvalue() {
    return parseFloat(localStorage.getItem('currencyValue'));
  } 

  CompleteForm(bool) {
    this.bool =  bool
  }  

//#endregion PayPal

  private initConfig(): void {
    console.log((localStorage.getItem("dollarvalue")))
    this.payPalConfig = {
      clientId: 'AUM90oLgQWe1wmWlH1UhclcByEM0hPaV6GSUEimQMtFr_U3X9lgA-c7HY0cU-c2ato_KzPGbyNATo-6t',
      createOrderOnClient: (data) => < ICreateOrderRequest > <unknown> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: (parseFloat(this.prices + this.getShipping()) * parseFloat(localStorage.getItem("dollarvalue"))).toFixed(2),
      
          }
        }]
      },
    advanced: {
        commit: 'true'
    },
    style: {
        label: 'paypal',
        layout: 'vertical'
    },
      onApprove: (data, actions) => {
        this.orderComponent("paypal")
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    
  }

//#region 

//#region Order functions

  showPaypal() {
    $('#js_payment_box_paypal').slideDown();
    $('#js_payment_box_cash').slideUp();
  }

  hidePaypal() {
    $('#js_payment_box_paypal').slideUp();
    $('#js_payment_box_cash').slideDown();
  }

  getShipping() {
    return parseInt(localStorage.getItem('shipping'));
  }

  orderComponent(type) {
    this.loader = true;

    var productsObj = [];

    for (var i = 0; i < this.cartItems.length; i++){
      productsObj.push({
        "productsize_id": parseInt(this.cartItems[i].productsize_id),
        "amount": this.cartItems[i].quantity,
        "total": parseFloat(this.cartItems[i].price) * this.getCurrencyvalue()
      })
    }

    console.log(productsObj);

    var obj = {
      "orderdetails": productsObj,
      "user_id": parseInt(localStorage.getItem('userID')),
      "order_status": 1,
      "price": (this.prices + this.getShipping()) * this.getCurrencyvalue(),
      "currency_id": parseInt(localStorage.getItem('currencyID')),
      "type": type,
      "user_lat": localStorage.getItem('lat'),
      "user_long": localStorage.getItem('lng'),
      "phone": $('#js_phone').val(),
      "notes": $('#js_notes').val()
    }
    
    this.service.addOrder(obj).subscribe(
      res => {
        this.notification.success(
          'اتمام الطلب',
          'تمت عملية اتمام الطلب بنجاح, شكرا لكم'
        ); 
        
        localStorage.removeItem('shipping');
        localStorage.removeItem('lat');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('lng');
        localStorage.removeItem('prices');
        localStorage.removeItem('address');
        localStorage.removeItem('country');

        this.loader = false;

        this.router.navigate(['/my-orders'])

      },
      err => {
        this.notification.error(
          'اتمام الطلب',
          'حدث خطا اثناء عملية اتمام الطلب, بالرجاء المحاولة في وقت لاحق'
        ); 
        
        this.loader = false;
      }
    )    
  }

  infoNotCompleated() {
    this.notification.warning(
      'اتمام الطلب',
      'بالرجاء اكمال معلومات التوصيل حتى تتمكن من اتمام الطلب'
    );
  }

  orderNow() {
    (localStorage.getItem('country') == 'country' || $('#js_phone').val() == '' || !localStorage.getItem('address'))
      ? this.infoNotCompleated()
      : this.orderComponent("cash");
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  } 

//#endregion

}
