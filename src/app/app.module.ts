import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './shared/components/input/input.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './shared/components/client/header/header.component';
import { FooterComponent } from './shared/components/client/footer/footer.component';
import { SideNavComponent } from './shared/components/client/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
