import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  currentYear: number = new Date().getFullYear();
  searchKeyword: string = '';

  @Input() user: User;

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService) {}

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  searchPosts(): void {
    if (this.searchKeyword && this.searchKeyword.trim() !== '') {
      this.router.navigate(['/blog/posts'], { 
        queryParams: { keyword: this.searchKeyword.trim() } 
      });
    }
  }
}
