import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import { ChangelogComponent } from './changelog/changelog.component';
import { TechComponent } from './tech/tech.component';

const usersRoutes: Routes = [ 
    { path: 'tech', component: TechComponent, canActivate: [AuthenticationGuard] },
    { path: 'changelog', component: ChangelogComponent, canActivate: [AuthenticationGuard] } ];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class DocRoutingModule {}  