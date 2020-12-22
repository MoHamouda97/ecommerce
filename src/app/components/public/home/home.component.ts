import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatabindingService } from 'src/services/databinding.service';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoader = true;
  isData = false;
  data;
  slides;
  newest;
  offers;
  bestSellers;  
  constructor(private service: MainService, private binding: DatabindingService, private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.get(localStorage.getItem("lang"));

    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.get(res);
        this.cdRef.detectChanges();
      }
    );    
  }

//#region Get data

  get(lang) {
    this.isLoader = true;
    
    this.service.getAll(lang).subscribe(
      res => {
        this.data = res;
        this.slides = this.data.sliders;
        this.newest = this.data.newdata;
        this.offers = this.data.offernew;
        this.bestSellers = this.data.mostselling;

        this.isLoader = false;
        this.isData = true;
      }
    )
  }

//#endregion

}
