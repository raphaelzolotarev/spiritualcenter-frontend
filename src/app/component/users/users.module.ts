import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from '../navbar/navbar.module';
import { UsersComponent } from './users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [ UsersComponent, UserdetailsComponent, SettingsComponent ],
  imports: [ SharedModule, UsersRoutingModule, NavBarModule ]
})
export class UsersModule {} 
   