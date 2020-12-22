import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as $ from 'jquery';
import { ProductService } from 'src/services/product/product.service';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  data;
  product = [];
  rates = [];
  related: any[] = [];
  isLoader = true;
  isNewLoad = true;
  lang;

  constructor(
    private service: ProductService,
    private binding: DatabindingService, 
    private router: ActivatedRoute,
    private notification: NzNotificationService,
    private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 

    this.subscription = this.router.params.subscribe(params => { 
      this.isNewLoad = false;
      this.cdRef.detectChanges(); 
      this.isNewLoad = true;
      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.getAll(params.id, 0, localStorage.getItem("lang"));
          this.cdRef.detectChanges();
        }
      )       
    });

    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;    

  }

//#region Get product data

  getAll(product_id, user_id, lang) {
    this.isLoader = true;
    localStorage.removeItem('size');

    this.service.getAll(product_id, user_id, lang).subscribe(
      res => {
        this.data = res;
        
        this.product = this.data.productdetails;
        this.related = this.data.related;
        
        $('#js_product_description').html(`${this.product[0].description}`);
        $('#js_product_description_en').html(`${this.product[0].description_en}`);

        this.service.getRates(this.product[0].id).subscribe(
          res => {
            this.data = res;
            this.rates = this.data.data[0].productrates;

            this.isLoader = false;
          }
        )
      },
      err => {
        this.notification.error(
          'خطا',
          'خطا في عملية استرجاع البيانات بالرجاء المحاولة في وقت لاحق'
        );
      }
    )
  }

//#endregion

//#region Select pro size

  returnProSize() {
    if (this.getLang() == 'ar')
      return 'بالرجاء اختيار حجم المنتج';
    
    return 'Please Select Product Size'
  }

//#endregion

//#region Dealing with currency

  getCurrencyName(){
    if (localStorage.getItem('currencySign') == 'ريال عماني' && localStorage.getItem('lang') == 'en') {
      return 'OMR';
    }
    return localStorage.getItem('currencySign');
  }

  getCurrencyvalue() {
    return parseFloat(localStorage.getItem('currencyValue'));
  } 

//#endregion

//#region Dealing with pro sizes

  addSizeAndPrice(val) {
    setTimeout(() => {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));
      let prices = JSON.parse(localStorage.getItem('prices'));
      var productPrice =  this.product[0].offers[0] 
        ? (((this.product[0].productsizes[val].current_price * this.getCurrencyvalue()) )  -  (this.product[0].productsizes[val].current_price  * this.product[0].offers[0].percentage) / 100 )
        : this.product[0].productsizes[val].current_price;

      localStorage.setItem('size', $('#js_select_size nz-select-item').attr('title'));
      localStorage.setItem('sizePrice', productPrice);
      localStorage.setItem('productsize_id', this.product[0].productsizes[val].id);
      
      if (localStorage.getItem('isProductPage')) {
        cartItems[cartItems.length - 1].price = localStorage.getItem('sizePrice');
        prices[prices.length - 1] = parseFloat(localStorage.getItem('sizePrice'));
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('prices', JSON.stringify(prices))
      }
    }, 100)
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

  ngOnDestroy(): void{
    localStorage.removeItem('size');
    localStorage.removeItem('sizePrice');
    localStorage.removeItem('productsize_id');
    localStorage.removeItem('isProductPage')
  }

}
