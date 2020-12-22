import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.scss']
})
export class NewestComponent implements OnInit {
  data;
  newest;
  lang;
  @Input('newestFromHome') newestFromHome;
  @Input('isData') isData;
  
  constructor(private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

    const isData = setInterval(() => {
      if (this.isData == true) {
        this.newest = this.newestFromHome;
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
        this.newest = changes.newestFromHome.currentValue;
        clearInterval(isChanged);
      }
    }, 1000);
  }

//#endregion

}
