import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import { UsersComponent } from './users/users.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SettingsComponent } from './settings/settings.component';

const usersRoutes: Routes = [ 
    { path: '', component: UsersComponent, canActivate: [AuthenticationGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthenticationGuard] },
    { path: ':id', component: UserdetailsComponent, canActivate: [AuthenticationGuard] } ];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}  