import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
  
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit {
  usersState$: Observable<State<CustomHttpResponse<Page & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState; 
  private keySearch : string = "";
  private nbrOfUsers$: Observable<CustomHttpResponse<number>>;
  private sortConfig: {type: string, order: string} = {
    type: 'id', 
    order: 'asc'
  };
  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    
    this.nbrOfUsers$ = this.userService.nbrOfUsers$(); 

    this.usersState$ = this.userService.searchUsers$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      )
   
  }
  searchUsers(searchForm: NgForm): void {
    this.currentPageSubject.next(0);
    this.keySearch = searchForm.value.name;
    this.usersState$ = this.userService.searchUsers$(this.keySearch)
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.notificationService.onError(error);
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }
  
  goToPage(pageNumber?: number): void {
    this.usersState$ = this.userService.searchUsers$(this.keySearch, pageNumber, this.sortConfig.type, this.sortConfig.order)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.notificationService.onError(error);
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }
 
  deleteUser(id: number): void {
    this.userService.deleteUser$(id).subscribe({
      next: () => {
        this.goToPage(this.currentPageSubject.value);
      },
      error: (error) => {
        this.notificationService.onError(error);
      }
    });
  }

  //SORTING SEARCH
  onSortTypeChange(event: any): void {
    this.sortConfig.type = event.target.value;
    this.goToPage(this.currentPageSubject.value);
  }
  onSortOrderChange(event: any): void {
    this.sortConfig.order = event.target.id === 'sortAsc' ? 'asc' : 'desc';
    this.goToPage(this.currentPageSubject.value);
  }

}
