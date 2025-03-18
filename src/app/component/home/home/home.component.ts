import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Profile } from 'src/app/interface/appstates';
import { State } from 'src/app/interface/state';
import { UserService } from 'src/app/service/user.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit {  
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  readonly DataState = DataState;

  private currentLocationSubject = new BehaviorSubject<string>('Loading...');  
  currentLocation$ = this.currentLocationSubject.asObservable();
  currentTime: string = '';

  constructor(private userService: UserService, private http: HttpClient) { }
 
  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error })
        })
      )


    this.updateCurrentTime();
    this.http.get('/api/json/')
    .subscribe({
      next: (data: any) => {
        if (data && data.city && data.country_name) {
          this.currentLocationSubject.next(`${data.city}, ${data.country_name}`);
        } else {
          this.currentLocationSubject.next('Belgium');
        }
      },
      error: (error) => {
        this.currentLocationSubject.next('Belgium');
      }
    });
    
  }
  
  updateCurrentTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
