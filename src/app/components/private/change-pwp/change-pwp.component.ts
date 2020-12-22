import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatabindingService } from 'src/services/databinding.service';
import { AuthService } from 'src/services/auth/auth.service';
import * as lang from './../../../../settings/lang';

@Component({
  selector: 'app-change-pwp',
  templateUrl: './change-pwp.component.html',
  styleUrls: ['./change-pwp.component.scss']
})
export class ChangePwpComponent implements OnInit {
  pwpForm: FormGroup;
  loader = false;
  lang;

  constructor(
    private service: AuthService,
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private binding: DatabindingService) { }

    ngOnInit(): void {
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;

      this.pwpForm = this.fb.group({
        oldPwp: [null, [Validators.required]],
        newPwp: [null, [Validators.required]],
        rePwp: [null, [Validators.required, this.confirmationValidator]]
      });
      
      this.binding.checkIsLangChanged.subscribe(
        res => {
          this.lang = (res == 'ar') ? lang.ar : lang.en;
        }
      );
      
      this.lang = (localStorage.getItem('lang') == 'ar') ? lang.ar : lang.en;        
    }

//#region Check pwp

  updateConfirmValidator() {
    Promise.resolve().then(() => this.pwpForm.controls.rePwp.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.pwpForm.controls.newPwp.value) {
      return { confirm: true, error: true };
    }
    return {};
  }; 

//#endregion

//#region Language

  getLang() {
    return localStorage.getItem('lang');
  }  

//#endregion

//#region 

  change() {
    let options;
    let id = parseInt(localStorage.getItem('userID'));
    let obj = {"password": this.pwpForm.get('newPwp').value};

    this.loader = true;

    this.service.changePwp(id, obj).subscribe(
      res => {
        if(this.getLang() == 'ar') {
          this.notification.success(
            'تغير كلمة المرور',
            'تم تغير كلمة المرور بنجاح'
          ); 
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.success(
            'Password Change',
            'Password changed successfully',
            options
          );         
        }        
        
        this.loader = false;
      },
      err => {
        if(this.getLang() == 'ar') {
          this.notification.error(
            'تغير كلمة المرور',
            'حدث خطا اثناء تغير كلمة المرور, بالرجاء المحاولة في وقت لاحق'
          ); 
        } else {
          options = {nzClass: 'lang-en'}
          this.notification.error(
            'Password Change',
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

  errorExistingPwp() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة كلمة المرور الحالية';
    return 'Please type your existing password';
  } 

  errorNewPwp() {
    if (this.getLang() == 'ar')
      return 'بالرجاء كتابة كلمة المرور الجديدة';
    return 'Please type your new password';
  } 

  errorReNewPwp() {
    if (this.getLang() == 'ar')
      return 'كلمة المرور غير مطابقة, بالرجاء التاكد من التطابق';
    return 'Password does not match, please make sure it matches';
  }  

//#endregion

}
