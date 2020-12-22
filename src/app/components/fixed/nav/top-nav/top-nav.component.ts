import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import { MainService } from 'src/services/main/main.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  currancyVisible = false;
  dataC;
  currencies = [];   
  lang;

  constructor(
    private binding: DatabindingService,
    private service: MainService,    
  ) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 
    this.getCurrencies();
       
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    ) 
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Get currencies

  getCurrencies(){
    this.service.getCurrencies().subscribe(
      res => {
        this.dataC = res;
        this.currencies = this.dataC.data;
        localStorage.setItem('currencySign', this.currencies[1].name_ar);
        localStorage.setItem('currencyValue', this.currencies[1].value);
        localStorage.setItem('currencyID', this.currencies[1].id);
      }
    )
  }  

  setCurrencySettings(id, value, name_ar) {
    localStorage.setItem('currencyID', id);
    localStorage.setItem('currencySign', name_ar);
    localStorage.setItem('currencyValue', value);
  }

//#endregion  

//#region Lang setting

  getLang() {
    return localStorage.getItem('lang');
  }  

  changeLang() {
    (localStorage.getItem("lang") == "ar") ? localStorage.setItem("lang", "en") : localStorage.setItem("lang", "ar");
    let lang = localStorage.getItem("lang");
    this.binding.changeLang(lang);     
  } 

//#endregion

}
