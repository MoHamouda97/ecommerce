import { Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent implements OnInit {
  lang;

  constructor(private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 
       
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    ) 
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Lang setting

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion  

}
