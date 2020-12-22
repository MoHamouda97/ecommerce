import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/services/auth/auth.service';
import * as lang from './../../../../../settings/lang';
import { DatabindingService } from 'src/services/databinding.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  data;
  loginForm: FormGroup;
  pwpBackForm: FormGroup;
  inputValue?: string;
  options: string[] = [];
  loader = false;
  pwploader = false;
  lang;

  constructor(
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private service: AuthService,
    private router: Router,
    private binding: DatabindingService,) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 

    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      pwp: [null, [Validators.required]],
    }); 
    
    this.pwpBackForm = this.fb.group({
      email: [null, [Validators.required]],
    });
    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

//#region Login function

  login() {
    this.loader = true;

    let obj = {
      "username":this.loginForm.get('username').value,
      "password":this.loginForm.get('pwp').value
    }

    this.service.login(obj).subscribe(
      res => {
        this.data = res;
        let options;

        if(this.getLang() == 'ar') {
          this.notification.success(
            'تسجيل دخول',
            'تمت عملية تسجيل الدخول بنجاح'
          ); 
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.success(
            'Login',
            'Login successfully',
            options
          );         
        }          

        localStorage.setItem('token', this.data.data.token);
        localStorage.setItem('userID', this.data.data.id);
        localStorage.setItem('username', this.data.data.username);

        let returnUrl = localStorage.getItem('returnUrl');
        (returnUrl) ? this.router.navigate([returnUrl]) : null;

        this.loader = false;
      },
      err => {
        let options;
        if (err.status == 401) {
          if(this.getLang() == 'ar') {
            this.notification.error(
              'تسجيل دخول',
              'حدث خطا اثناء تسجيل الدخول بالرجاء المحاولة في وقت لاحق'
            ); 
          } else {
            options = {nzClass: 'lang-en'}
            this.notification.error(
              'Login',
              'Something wrong, please try agin later',
              options
            );         
          }
        } else {
          if(this.getLang() == 'ar') {
            this.notification.error(
              'تسجيل دخول',
              'اسم المستخدم او كلمةالمرور غير صحيحه'
            ); 
          } else {
            options = {nzClass: 'lang-en'}
            this.notification.error(
              'Login',
              'Username or/and passowrd not correct, please try again',
              options
            );         
          }
        }                
        
        this.loader = false;
      }
    )

  }

//#endregion

//#region Auto complete email

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', 'yahoo.com', 'hotmail.com'].map(domain => `${value}@${domain}`);
    }
  }

//#endregion

//#region Toggle 2 forms

  showPwpForm() {
    $('#js_pwp_back').slideDown();
    $('#js_login').slideUp();
    $('#js_forget_pwp').addClass('d-none');
    $('#js_show_login').removeClass('d-none');
  }

  showLoginForm() {
    $('#js_pwp_back').slideUp();
    $('#js_login').slideDown();
    $('#js_forget_pwp').removeClass('d-none'); 
    $('#js_show_login').addClass('d-none');   
  }

//#endregion

//#region get password

  pwp() {
    this.pwploader = true;

    let obj = {"email": this.pwpBackForm.get('email').value}

    this.service.getPwp(obj).subscribe(
      res => {
        this.notification.success(
          'استرجاع كلمة المرور',
          'تمت عملية استرجاع كلمة المرور بنجاح'
        ); 

      },
      err => {
        this.notification.error(
          'استرجاع كلمة المرور',
          'حدث خطا اثناء عملية استرجاع كلمة المرور بالرجاء المحاولة لاحقا'
        ); 
        
        this.pwploader = false;        
      }
    )
  }

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

//#region AR to EN

  errorTipUser() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة اسم المستخدم';
    return 'Please type your username';
  }

  errorTipPassword() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة كلمة السر';
    return 'Please type your password';
  } 
  
  errorTipEmail() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة البريد الالكتروني';
    return 'Please type your email';
  }   

//#endregion

}
