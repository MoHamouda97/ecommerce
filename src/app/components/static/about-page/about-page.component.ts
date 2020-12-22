import { Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  lang;

  constructor(private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;
    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

}
