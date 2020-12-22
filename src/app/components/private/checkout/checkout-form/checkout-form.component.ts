import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CheckoutService } from 'src/services/checkout/checkout.service';
import { CheckoutComponent } from '../checkout.component';
import * as $ from 'jquery';

@Component({
  selector: 'checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  checkForm: FormGroup;
  data;
  countries;
  lat;
  lng;
  zoom = 15;
  geocoder = new google.maps.Geocoder(); 
  updateLoader = false;
  @ViewChild('map3', { static: true }) map3; 


  constructor(
    private service: CheckoutService,
    private fb: FormBuilder, 
    private notification: NzNotificationService,private parent:CheckoutComponent) { }

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      country: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      phoneNumberPrefix: [null, [Validators.required]],
      notes: [null],
      address: [null, Validators.required]
    }); 
    
    this.getCountries();

    navigator.geolocation.getCurrentPosition((position) => {                   
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });     
  }

  getCountries() {
    this.service.getCountries().subscribe(
      res => {
        this.data = res;
        this.countries = this.data.data;
        console.log(this.countries)
      }
    )
  }
  
  markerDragEnd(m: any) {
    let lat = m.coords.lat;
    let lng = m.coords.lng;    
    this.geocoder.geocode({
      'location': {
        lat: lat,
        lng: lng
      }
    }, (result, status) => {
      localStorage.setItem('lat', result[0].geometry.location.lat().toString());
      localStorage.setItem('lng', result[0].geometry.location.lng().toString());          
    })
  }  
  
  changeAddress(event) {
    let address = event.target.value;
    let options;

    localStorage.setItem('address', address);

    this.geocoder.geocode({'address': address}, (result, status) => {
      this.lat = result[0].geometry.location.lat();
      this.lng = result[0].geometry.location.lng();

      localStorage.setItem('lat', this.lat.toString());
      localStorage.setItem('lng', this.lng.toString());      
    });

    if  (localStorage.getItem('country') != "country" && $('#js_phone').val() != null  ) {
      this.parent.CompleteForm(true)
    }else {
      if(this.getLang() == 'ar') {
        this.notification.error(
          'اتمام الطلب',
          'بالرجاء اضافة كامل البيانات'
        ); 
      } else {
        options = {nzClass: 'lang-en'}
        this.notification.error(
          'Your Order',
          'Please complete any missing field',
          options
        );         
      }
    }
  } 
  
  selectCountry(val) {
   console.log(val) 
    localStorage.setItem('country', val);
    (val == 'سلطنة عًمان') ? localStorage.setItem('shipping', '2') : localStorage.setItem('shipping', '7');
    (val == 'country') ? localStorage.setItem('shipping', '0') : null;
  }

  getLang() {
    return localStorage.getItem('lang');
  }   

}
