import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as $ from 'jquery';
import { DatabindingService } from 'src/services/databinding.service';
import { ProductService } from 'src/services/product/product.service';
import { OrdersService } from 'src/services/orders/orders.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  isVisible = false;
  rateForm: FormGroup;
  loader = false;
  data;
  orders = [];
  ordersByReady = [];
  ordersByOnRoad = [];
  ordersByDone = [];
  ordersByDelivred = [];
  isLoader = true;
  order = [];
  lang;

  constructor(
    private service: OrdersService,
    private proService: ProductService,
    private binding: DatabindingService,
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private cdRef : ChangeDetectorRef) { }

    ngOnInit(): void {
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

      this.rateForm = this.fb.group({
        comment: [null, [Validators.required]],
        rate: [null, [Validators.required]]
      });  
  
      this.getOrders(localStorage.getItem("lang"));
      
      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.getOrders(res);
          this.cdRef.detectChanges();
        }
      );
      
      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.lang = (res == 'ar') ? lang.ar : lang.en;
        }
      );
      
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;       
    }

//#region Currancy

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

//#region Get orders

  getOrders(lang){ 
    this.isLoader = true;   
    this.service.getOrders(parseInt(localStorage.getItem('userID')), lang).subscribe(
      res => {
        this.data = res; 
        this.orders = this.data.data;       
        
        this.ordersByReady = this.data.data.filter(o => o.order_status == 1);
        this.ordersByOnRoad = this.data.data.filter(o => o.order_status == 2);
        this.ordersByDone = this.data.data.filter(o => o.order_status == 3);
        this.ordersByDelivred = this.data.data.filter(o => o.order_status == 4);

        this.orders = this.ordersByReady;

        this.isLoader = false;
      }
    )
  } 

  filterOrders(val) {
    switch (val) {
      case 'ready' :
        this.orders = this.ordersByReady
        break;
      case 'on-road' :
        this.orders = this.ordersByOnRoad;
        break;
      case 'done' :
        this.orders = this.ordersByDone;
        case 'delivred' :
        this.orders = this.ordersByDelivred;
        break;
    }
  }

//#endregion

//#region Modal

  showDetails(i) {
    this.order = this.orders[i].orderdetails;
    this.isVisible = true;    
  }

  handleCancel(){
    this.isVisible = false;
  } 

  modalTitle() {
    if (this.getLang() == 'ar') {return 'تفاصيل الطلبية' }
    return 'Order Details';
  }  

//#endregion

//#region Rate

  addRate(id) {
    localStorage.setItem('productID', id);
    $('.form').slideToggle();
  }

  rate() {
    let options;
    this.loader = true;

    let obj = {
      "user_id": parseInt(localStorage.getItem('userID')),
      "product_id": parseInt(localStorage.getItem('productID')),
      "rate": this.rateForm.get('rate').value,
      "comment": this.rateForm.get('comment').value,
    };

    this.proService.addRate(obj).subscribe(
      res => {
        if(this.getLang() == 'ar') {
          this.notification.success(
            'اضافة تقييم',
            'تمت اضافة تقيمكم بنجاح, شكرا لكم!!'
          );  
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.success(
            'Add Rate',
            'Your rating added successfully, thank you',
            options
          );         
        }        
        
        this.loader = false;
        $('.form').slideUp();
        this.rateForm.reset();
      },
      err => {
        if(this.getLang() == 'ar') {
          this.notification.error(
            'اضافة تقييم',
            'حدث خطا اثناء اضافة التقييم بالرجاء المحاولة في وقت لاحق'
          );  
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.error(
            'Add Rate',
            'Something wrong, please try again later',
            options
          );         
        }               
      }
    );    
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }
  
  errorRateUsername() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة اسم المستخدم';
    return 'Please enter the username';
  } 
  
  errorRateCommint() {
    if (this.getLang() == 'ar')
      return 'بالرجاء اضافة تعليق';
    return 'Please add your commint';
  } 

//#endregion

}
