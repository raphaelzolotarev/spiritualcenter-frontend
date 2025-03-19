import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, map, startWith, catchError, of, switchMap } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page, Profile } from 'src/app/interface/appstates';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
 
@Component({  
  selector: 'app-userdetails', 
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserdetailsComponent  implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<User & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<User & User>>(null);
  readonly DataState = DataState;
  constructor(private route: ActivatedRoute, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.profileState$ = this.route.paramMap.pipe(
      switchMap(params => {
        const userId = Number.parseInt(params.get('id'));
        
        return this.userService.seeUserDetails$(userId).pipe(
          map(response => {
            this.dataSubject.next(response);
            return { dataState: DataState.LOADED, appData: response };
          }),
          startWith({ dataState: DataState.LOADING }),
          catchError((error: string) => {
            this.notificationService.onError(error);
            return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error });
          })
        );
      })
    );
  }
}