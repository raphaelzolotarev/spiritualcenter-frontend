import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home/home.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: 'doc', loadChildren: () => import('./component/doc/doc.module').then(module => module.DocModule)},
  { path: 'blog', loadChildren: () => import('./component/blog/blog.module').then(module => module.BlogModule)},
  { path: 'users', loadChildren: () => import('./component/users/users.module').then(module => module.UsersModule)},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent, canActivate: [AuthenticationGuard] },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
