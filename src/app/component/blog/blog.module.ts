import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from '../navbar/navbar.module';
import { CreateComponent } from './create/create.component';
import { PostsComponent } from './posts/posts.component';
import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './post/post.component';
import { TruncatePostPipe } from 'src/app/pipes/truncatepost.pipe';

@NgModule({
  declarations: [ TruncatePostPipe, CreateComponent, PostsComponent, PostComponent ],
  imports: [ SharedModule, BlogRoutingModule, NavBarModule ]
})
export class BlogModule {}    