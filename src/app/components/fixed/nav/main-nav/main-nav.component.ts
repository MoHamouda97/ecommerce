import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import { ProductService } from 'src/services/product/product.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  data;
  inputValue;
  lang;
  loginVisible = false;
  searchVisible = false;
  isSearch = false;
  results = [];
  constructor(
    private binding: DatabindingService,
    private service: ProductService,
  ) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    ) 
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;    
  }

//#region Search function  

  onInput(e): void { 
    this.isSearch = true;

    const value = (e.target as HTMLInputElement).value;

    let obj = {"name": value}

    if (value == '') {
      this.results = [];
      this.isSearch = false;
    } else {
      let lang = (localStorage.getItem("lang") == 'ar') ? 'ar' : 'en;'
      this.service.search(obj, lang).subscribe(
        res => {
          this.data = res;
          this.results = this.data.data;

          this.isSearch = false;
        });
    }
  } 
  
  clear() {
    this.results = [];
  } 
  
//#endregion  

//#region set place holder

  searchBoxPlaceHolder (){
    if (localStorage.getItem("lang") == "ar") {
      return 'البحث في المتجر'
    }
    return 'Search at the market'
  }

//#endregion

//#region Lang function

  getLang() {
    return localStorage.getItem('lang');
  } 
  
//#endregion 

//#region Count cart items

  countCartItems() {
    if (localStorage.getItem('cartItems')) 
      return JSON.parse(localStorage.getItem('cartItems')).length;
  
    return 0;    
  }

//#endregion

}
