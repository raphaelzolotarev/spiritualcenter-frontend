import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { State } from 'src/app/interface/state';
import { CustomHttpResponse, Profile } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';
import { DataState } from 'src/app/enum/datastate.enum';
 
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  readonly DataState = DataState;
  title = 'YOUR TITLE HERE';
  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at consectetur leo. Sed vel erat porta, malesuada urna ut, pulvinar lorem. Morbi vel mattis sem. Etiam vestibulum egestas molestie. Pellentesque vel massa justo. Donec facilisis maximus erat, ac ornare urna bibendum sit amet. Suspendisse lacinia magna eget lacus auctor ullamcorper. Pellentesque id luctus felis. Suspendisse a viverra nibh.';

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) { }

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
  } 

  onSubmit(): void {
    const post = {
      title: this.title,
      content: this.content,
      createdAt: new Date()
    };

    this.postService.createPost(post).subscribe(() => {
      this.router.navigate(['/blog/posts']);
    });
  }
}