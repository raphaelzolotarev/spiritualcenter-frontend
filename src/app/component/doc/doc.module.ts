import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarModule } from '../navbar/navbar.module';
import { ChangelogComponent } from './changelog/changelog.component';
import { DocRoutingModule } from './doc-routing.module';
import { TechComponent } from './tech/tech.component';

@NgModule({
  declarations: [ ChangelogComponent, TechComponent ],
  imports: [ SharedModule, DocRoutingModule, NavBarModule ]
})
export class DocModule { }
 