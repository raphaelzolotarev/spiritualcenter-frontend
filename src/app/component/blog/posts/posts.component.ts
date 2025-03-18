import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { State } from 'src/app/interface/state';
import { CustomHttpResponse, Profile } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';
import { DataState } from 'src/app/enum/datastate.enum';
import { Post } from 'src/app/interface/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent  implements OnInit {  
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  readonly DataState = DataState;
  posts: Post[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error });
        })
      );
  
      //check if has keyword from search bar
      this.route.queryParams.subscribe(params => {
        this.loading = true;
        
        if (params['keyword']) {
          this.postService.searchPostsByTitle(params['keyword']).subscribe({
            next: (data) => {
              this.posts = data;
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Error searching posts';
              this.loading = false;
              console.error(err);
            }
          });
        } else {
          this.postService.getPosts().subscribe({
            next: (data) => {
              this.posts = data;
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Error loading posts';
              this.loading = false;
              console.error(err);
            }
          });
        }
      });
    }
  }
