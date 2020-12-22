import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private notification: NzNotificationService) { }

  canActivate(route, state: RouterStateSnapshot) {
    let options;
    if(localStorage.getItem('token'))
      return true;
    
    if(this.getLang() == 'ar') {
      this.notification.warning(
        'تسجيل دخول', 
        'بالرجاء تسجيل الدخول قبل الدخول الى هذه الصفحة'
      );
    } else {
      options = {nzClass: 'lang-en'}
      this.notification.warning(
        'Login',
        'Please login before enter this page',
        options
      );         
    }       
    
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    localStorage.setItem('returnUrl', state.url);
    return false;
  }
  
  getLang() {
    return localStorage.getItem('lang');
  }    
}
