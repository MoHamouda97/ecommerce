import { Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../../settings/lang';

@Component({
  selector: 'app-footer-copyright',
  templateUrl: './footer-copyright.component.html',
  styleUrls: ['./footer-copyright.component.scss']
})
export class FooterCopyrightComponent implements OnInit {
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
