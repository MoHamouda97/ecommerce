import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product/product.service';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss']
})
export class StoreProductsComponent implements OnInit {
  id;
  data;
  products = [];
  lang;
  pagination;
  isLoader = true;
  paginationLoader = false;

  constructor(
    private service: ProductService,
    private binding: DatabindingService, 
    private router: ActivatedRoute,
    private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.pagination = 1;
    this.getStorProducts(this.id, this.pagination, localStorage.getItem('lang'));

    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.getStorProducts(this.id, this.pagination, res);
        this.cdRef.detectChanges();
      }
    );

    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;      
  }

//#region Get category's products

  getStorProducts(id, page, lang) {
    this.isLoader = true;

    this.service.getStorProducts(id, page, lang).subscribe(
      res => {
        this.data = res;
        this.products = this.data.data;
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
    this.service.getStorProducts(this.id, this.pagination, localStorage.getItem("lang")).subscribe(res => {
      this.data = res;
      (this.data.data.length === 0) ? this.pagination = 0 : this.products.push(...this.data.data);

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
