import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as $ from 'jquery';
import { DatabindingService } from 'src/services/databinding.service';
import { CategoryService } from 'src/services/category/category.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  subscription: Subscription;
  data;
  cats = [];
  pagination = 1;
  paginationLoader: boolean;
  type;
  id;
  userId;
  lang;
  isLoader = true;

  constructor(
    private service: CategoryService,
    private binding: DatabindingService, 
    private router: ActivatedRoute,
    private notification: NzNotificationService,
    private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 

    this.subscription = this.router.params.subscribe(params => {
      this.cats = [];
      this.pagination = 1;
      this.getStors(params.id, params.isCat, localStorage.getItem('lang'));

      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.getStors(params.id, params.isCat, res);
          this.cdRef.detectChanges();
        }
      );

      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.lang = (res == 'ar') ? lang.ar : lang.en;
        }
      );
      
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;          
    });     
  }

//#region Get category's products

  getStors(id, type, lang) {
    this.isLoader = true;

    this.service.getStors(id, type, lang).subscribe(
      res => {
        this.data = res;
        this.cats = this.data.data;
        this.isLoader = false;
      }
    )
  }

//#region 

//#region Pagination

  @HostListener("window:scroll", [])
  onScroll() {
    if((($(window).scrollTop() + $(window).height()) >= $(document).height() - 1) && !localStorage.getItem('searchResult')) {
      (this.pagination === 0) ? null : this.paginationFunc();
    }   
  }

  paginationFunc() {
    this.pagination += 1;
    this.paginationLoader = true;
    this.service.getAll(this.id, this.userId,this.pagination, localStorage.getItem("lang")).subscribe(res => {
      (res.data.length === 0) ? this.pagination = 0 : this.cats.push(...res.data);
      console.log(this.cats)

      this.paginationLoader = false;
    }); 
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

}
