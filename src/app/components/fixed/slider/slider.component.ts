import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input('slides') slides = []; 

  customOptions: OwlOptions = {
    rtl:false,
    center: true,
    margin:10,
    autoplay:true,
    autoplayHoverPause:true,
    dots:false,
    loop: true,
    nav: true,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
  }; 

  constructor() { }

  ngOnInit(): void {
  }

}
