import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './component/auth/auth.module';
import { HomeModule } from './component/home/home.module';
import { NotificationModule } from './notification.module';
import { DocModule } from './component/doc/doc.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    HomeModule,    
    AppRoutingModule,
    NotificationModule,
    DocModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 