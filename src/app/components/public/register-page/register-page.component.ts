import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/services/auth/auth.service';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  data;
  regForm: FormGroup;
  inputValue?: string;
  options: string[] = [];
  loader = false;
  lang;

  constructor(
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private service: AuthService,
    private binding: DatabindingService) { }

  ngOnInit(): void {
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en; 

    this.regForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      pwp: [null, [Validators.required]],
      agree: [null, Validators.required]
    });
    
    this.binding.checkIsLangChanged.subscribe(
      res => {
        this.lang = (res == 'ar') ? lang.ar : lang.en;
      }
    );
    
    this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;     
  }

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
  
  errorTipMobile() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة رقم الهاتف';
    return 'Please type your phone number';
  }   

//#endregion

//#region Reg function

  reg() {

    this.loader = true;

    let obj = {
      "username": this.regForm.get('username').value,
      "password": this.regForm.get('pwp').value,
      "phone": `0${this.regForm.get('mobile').value}`,
      "email": this.regForm.get('email').value,
      "email_verified": 1,
      "active": 1,
      "user_group_id": 2,
    }

    this.service.register(obj).subscribe(
      res => {
        let options;
        this.data = res;

        if(this.getLang() == 'ar') {
          this.notification.success(
            'انشاء حساب',
            'تمت عملية انشاء حساب جديد بنجاح'
          ); 
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.success(
            'Register',
            'Your account has been created successfully',
            options
          );         
        }        

        localStorage.setItem('token', this.data.data.token);
        localStorage.setItem('userID', this.data.data.id);

        this.loader = false;
      },
      err => {
        let options;

        if(this.getLang() == 'ar') {
          this.notification.error(
            'انشاء حساب',
            'إسم المستخدم او الايميل موجود مسبقا'
          );  
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.error(
            'Register',
            'Username or/and email already exists, please use different one',
            options
          );         
        }           
        
        this.loader = false;
      }
    )

  }

//#endregion

}
