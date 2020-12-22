import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';

  constructor(private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  deletToken($event) {
  //  localStorage.removeItem('token');
  }  

  ngOnInit(): void {
    (localStorage.getItem('lang')) ? null : localStorage.setItem("lang", "ar");

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      $("html, body").animate({ scrollTop: 0 }, 0);
    });    
  }  
}
