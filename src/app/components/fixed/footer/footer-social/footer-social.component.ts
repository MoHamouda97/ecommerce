import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product/product.service';

@Component({
  selector: 'app-footer-social',
  templateUrl: './footer-social.component.html',
  styleUrls: ['./footer-social.component.scss']
})
export class FooterSocialComponent implements OnInit {
  data = [];
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.getIcons();
  }

//#region Footer icons

  getIcons() {
    this.service.GetFooterIcons().subscribe(
      res => {
        this.data = res.contact
      }
    )    
  }

//#endregion

}
