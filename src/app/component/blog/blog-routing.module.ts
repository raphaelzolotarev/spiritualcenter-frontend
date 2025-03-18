import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import { CreateComponent } from './create/create.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

const blogRoutes: Routes = [ 
    { path: 'create', component: CreateComponent, canActivate: [AuthenticationGuard] },
    { path: 'posts', component: PostsComponent, canActivate: [AuthenticationGuard] },
    { path: 'post/:id', component: PostComponent, canActivate: [AuthenticationGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(blogRoutes)],
    exports: [RouterModule]
})
export class BlogRoutingModule {}  