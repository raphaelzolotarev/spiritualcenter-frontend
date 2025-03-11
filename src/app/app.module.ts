import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyComponent } from './component/verify/verify.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './component/profile/profile.component';
import { UsersComponent } from './component/users/users.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { StatsComponent } from './component/stats/stats.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ExtractArrayValue } from './pipes/extractvalue.pipe';

@NgModule({
  declarations: [
    ExtractArrayValue,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ResetpasswordComponent,
    ProfileComponent,
    UsersComponent,
    HomeComponent,
    NavbarComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
