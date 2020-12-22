import { MainService } from './../services/main/main.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

// ant design
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

// mat 
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';

// google
import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';

// carousel
import { CarouselModule } from 'ngx-owl-carousel-o';

// paypal
import { NgxPayPalModule } from 'ngx-paypal';

// private
import { ChangeInfoComponent } from './components/private/change-info/change-info.component';
import { ChangePwpComponent } from './components/private/change-pwp/change-pwp.component';
import { MyOrdersComponent } from './components/private/my-orders/my-orders.component';
import { CheckoutComponent } from './components/private/checkout/checkout.component';
import { CheckoutFormComponent } from './components/private/checkout/checkout-form/checkout-form.component';

// public
import { HomeComponent } from './components/public/home/home.component';
import { OffersComponent } from './components/public/home/offers/offers.component';
import { NewestComponent } from './components/public/home/newest/newest.component';
import { BestSellersComponent } from './components/public/home/best-sellers/best-sellers.component';
import { AppPromotionComponent } from './components/public/home/app-promotion/app-promotion.component';
import { CategoryComponent } from './components/public/category/category.component';
import { CartComponent } from './components/public/cart/cart.component';
import { ProductPageComponent } from './components/public/product-page/product-page.component';
import { LoginPageComponent } from './components/public/login-page/login-page.component';
import { LoginFormComponent } from './components/public/login-page/login-form/login-form.component';
import { RegisterPageComponent } from './components/public/register-page/register-page.component';
import { StoreProductsComponent } from './components/public/store-products/store-products.component';

// fixed
import { NavComponent } from './components/fixed/nav/nav.component';
import { TopNavComponent } from './components/fixed/nav/top-nav/top-nav.component';
import { MainNavComponent } from './components/fixed/nav/main-nav/main-nav.component';
import { FooterComponent } from './components/fixed/footer/footer.component';
import { FooterSocialComponent } from './components/fixed/footer/footer-social/footer-social.component';
import { FooterLinksComponent } from './components/fixed/footer/footer-links/footer-links.component';
import { FooterCopyrightComponent } from './components/fixed/footer/footer-copyright/footer-copyright.component';
import { SliderComponent } from './components/fixed/slider/slider.component';
import { TermsPageComponent } from './components/static/terms-page/terms-page.component';

// reusable
import { LoaderComponent } from './components/reusable/loader/loader.component';
import { ProductCardComponent } from './components/reusable/product-card/product-card.component';
import { CartButtonComponent } from './components/reusable/cart-button/cart-button.component';

// static
import { AboutPageComponent } from './components/static/about-page/about-page.component';
import { PaymentPageComponent } from './components/static/payment-page/payment-page.component';
import { ShippingPageComponent } from './components/static/shipping-page/shipping-page.component';

// services
import { DatabindingService } from 'src/services/databinding.service';
import { SideNavComponent } from './components/fixed/nav/side-nav/side-nav.component';
import { ProductService } from 'src/services/product/product.service';
import { CategoryService } from 'src/services/category/category.service';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthGuardService } from 'src/services/guard/auth-guard.service';
import { OrdersService } from 'src/services/orders/orders.service';
import { CheckoutService } from 'src/services/checkout/checkout.service';

@NgModule({
  declarations: [
    AppComponent,
    // fixed
    NavComponent,
    TopNavComponent,
    MainNavComponent,
    SideNavComponent,
    FooterComponent,
    FooterSocialComponent,
    FooterLinksComponent,
    FooterCopyrightComponent,
    SliderComponent,
    // reusable
    LoaderComponent,
    ProductCardComponent,
    CartButtonComponent,
    // public
    HomeComponent,
    OffersComponent,
    NewestComponent,
    BestSellersComponent,
    AppPromotionComponent,
    CategoryComponent,
    CartComponent,
    ProductPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    StoreProductsComponent,
    // private
    ChangeInfoComponent,
    ChangePwpComponent,
    MyOrdersComponent,
    CheckoutComponent,
    CheckoutFormComponent,
    // static
    AboutPageComponent,
    PaymentPageComponent,
    ShippingPageComponent,
    TermsPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    MatRippleModule,
    MatButtonModule, 
    NgxPayPalModule,
    CarouselModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCjzzd4nbOiZJx3B53u9ZZAq0tcOsVUBdg' }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'category/:id/:isCat',
        component: CategoryComponent
      },
      {
        path: 'product/:id',
        component: ProductPageComponent
      },      
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: 'change-info',
        component: ChangeInfoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'change-password',
        component: ChangePwpComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'store/product/:id',
        component: StoreProductsComponent,
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'info',
        component: PaymentPageComponent
      },
      {
        path: 'policy',
        component: ShippingPageComponent
      },
      {
        path: 'terms',
        component: TermsPageComponent
      }                                                                                                                                      
    ])
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    GoogleMapsAPIWrapper,
    DatabindingService,
    MainService,
    ProductService,
    CategoryService,
    AuthService,
    AuthGuardService,
    OrdersService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
