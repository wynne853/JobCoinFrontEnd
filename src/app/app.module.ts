import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductServiceService } from '../services/product-service.service';
import { SearchComponent } from './search/search.component';
import { MyAreaComponent } from './my-area/my-area.component';

import { AppRoutingModule } from './app-routing.module';
import {TabViewModule} from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';

import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DialogCalculatorComponent } from './dialog-calculator/dialog-calculator.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    SearchComponent,
    MyAreaComponent,
    RegisterUserComponent,
    DialogCalculatorComponent,
    DialogLoginComponent,
    MainComponent
  ],
  imports: [
    BrowserAnimationsModule,
    TabViewModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    DataViewModule,
    TabViewModule,
    RatingModule,
    DropdownModule,
    ProductServiceService,
    PanelModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
