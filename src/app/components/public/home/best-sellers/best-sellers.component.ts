import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {
  data;
  bestSellers;
  lang;
  @Input('bestSellersFromHome') bestSellersFromHome;
  @Input('isData') isData;  
  
  constructor(private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

    const isData = setInterval(() => {
      if (this.isData == true) {
        this.bestSellers = this.bestSellersFromHome;
        clearInterval(isData);
      }
    }, 1000);
    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );

    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;    
  }

//#region Check language

  getLang() {
    return localStorage.getItem('lang');
  }

  changeLang(){
    (localStorage.getItem("lang") == "ar") ? localStorage.setItem("lang", "en") : localStorage.setItem("lang", "ar");
    let lang = localStorage.getItem("lang");
    this.binding.changeLang(lang);    
  }

//#endregion

//#region Check changes 

  ngOnChanges(changes: SimpleChanges) {
    const isChanged = setInterval(() => {
      if (typeof (changes.newestFromHome) == 'undefined') {
        null;
      } else {
        this.bestSellers = changes.bestSellersFromHome.currentValue;
        clearInterval(isChanged);
      }
    }, 1000);
  } 

//#endregion  

}
