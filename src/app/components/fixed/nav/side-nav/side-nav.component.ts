import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import { MainService } from 'src/services/main/main.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  data;
  dataC;
  links;
  currencies = []; 
  lang = (lang.getLang() == 'ar') ? lang.ar : lang.en;

  constructor(
    private service: MainService,
    private binding: DatabindingService,
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAll(localStorage.getItem("lang"));
    this.getCurrencies();
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.getAll(res);
        this.cdRef.detectChanges();
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    ) 
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Get links

  getAll(lang){
    this.service.getAll(lang).subscribe(
      res => {
        this.data = res;
        this.links = this.data.category;
      }
    )
  } 

//#endregion

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
