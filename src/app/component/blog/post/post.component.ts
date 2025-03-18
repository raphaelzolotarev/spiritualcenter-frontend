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
  selector: 'app-post', 
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  readonly DataState = DataState;

  id : number = 0;
  title : string = '';
  content : string = '';

  post: Post;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
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



      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        
        if (id) {
          this.loadPost(id);
          this.id = id;
        } else {
          this.error = 'ID de post invalide';
          this.loading = false;
        }
      });
    }
  
    loadPost(id: number): void {
      this.loading = true;
      this.postService.getPostById(id).subscribe({
        next: (data) => {
          this.post = data;
          this.loading = false;
          this.title = this.post.title;
          this.content = this.post.content;
        },
        error: (err) => {
          this.error = 'Error loading post';
          this.loading = false;
          console.error(err);
        }
      });
    }
  


    onSubmit(): void {
      const post = {
        id : this.id,
        title: this.title,
        content: this.content,
        createdAt: new Date()
      };  
      this.postService.updatePost(post).subscribe();
    }

    deletePost(): void {  
      this.postService.deletePost(this.post.id).subscribe(() => {
        this.router.navigate(['/blog/posts']);
      });
    }


}