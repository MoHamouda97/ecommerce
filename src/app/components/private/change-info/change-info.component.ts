import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatabindingService } from 'src/services/databinding.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {
  infoForm: FormGroup;
  inputValue?: string;
  options: string[] = []; 
  data: any; 
  loader = false;
  isDataLoaded = true;
  lang;

  constructor(
    private service: AuthService,
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private binding: DatabindingService) { }

    ngOnInit(): void {
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

      this.infoForm = this.fb.group({
        email: [null, [Validators.required]],
        mobile: [null, [Validators.required]]
      });

      this.getUserData(); 
      
      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.lang = (res == 'ar') ? lang.ar : lang.en;
        }
      );
      
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;       
    }

//#region Get user data

  getUserData() {
    let id = parseInt(localStorage.getItem('userID'));

    this.service.getUserById(id).subscribe(
      res => {
        this.data = res;

        this.infoForm.get('email').setValue(this.data.data.email);
        this.infoForm.get('mobile').setValue(this.data.data.mobile);

        this.isDataLoaded = false;
      }
    )
  }

//#endregion

//#region For email

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

//#region Change info

  change() {
    let options;
    let id = parseInt(localStorage.getItem('userID'));
    let obj = {"email": this.infoForm.get('email').value, "mobile": `0${this.infoForm.get('mobile').value}`};

    this.loader = true;

    this.service.changeInfo(id, obj).subscribe(
      res => {

        if(this.getLang() == 'ar') {
          this.notification.success(
            'تغير البيانات',
            'تم تغير البيانات بنجاح'
          ); 
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.success(
            'Information Change',
            'Your information changed successfully',
            options
          );         
        }        
        
        this.loader = false;
      },
      err => {
        if(this.getLang() == 'ar') {
          this.notification.error(
            'تغير البيانات',
            'حدث خطا اثناء تغير البيانات , بالرجاء المحاولة في وقت لاحق'
          );
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.error(
            'Information Change',
            'Something wrong, please try again',
            options
          );         
        }          
        
        this.loader = false;
      }
    )
  }

//#endregion

//#region AR to EN

  errorTipMobileNew() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة رقم الهاتف الجديد';
    return 'Please type your new phone number';
  } 

  errorTipEmailNew() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة البريد الالكتروني الجديد';
    return 'Please type your new email address';
  }   

//#endregion

}
