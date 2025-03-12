import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

}
