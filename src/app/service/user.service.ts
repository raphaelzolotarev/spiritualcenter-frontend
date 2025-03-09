import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstates';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly server: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login$ = (username: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
      (`${this.server}/user/login`, { username, password })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$ = (username: string, code: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/verify/code/${username}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

      profile$ = () => <Observable<CustomHttpResponse<Profile>>>
      this.http.get<CustomHttpResponse<Profile>>
        (`${this.server}/user/profile`, { headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJDVVNUT01FUl9NQU5BR0VNRU5UX1NFUlZJQ0UiLCJzdWIiOiIxIiwiaXNzIjoiR0VUX0FSUkFZU19MTEMiLCJleHAiOjE2NzkyNzc1ODgsImlhdCI6MTY3ODg0NTU4OCwiYXV0aG9yaXRpZXMiOlsiUkVBRDpVU0VSIiwiUkVBRDpDVVNUT01FUiJdfQ.eFB4zpZnMAtez3F6oFkcc4_3EdsggBO04IRq1DRlkNTTMAue77NoQDIuSFQurWCeXAxZIn1rS2-c4DzK26Xb9A') })
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
        

  update$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
  this.http.patch<CustomHttpResponse<Profile>>
    (`${this.server}/user/update`, user, { headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJDVVNUT01FUl9NQU5BR0VNRU5UX1NFUlZJQ0UiLCJzdWIiOiIxIiwiaXNzIjoiR0VUX0FSUkFZU19MTEMiLCJleHAiOjE2NzkyNzc1ODgsImlhdCI6MTY3ODg0NTU4OCwiYXV0aG9yaXRpZXMiOlsiUkVBRDpVU0VSIiwiUkVBRDpDVVNUT01FUiJdfQ.eFB4zpZnMAtez3F6oFkcc4_3EdsggBO04IRq1DRlkNTTMAue77NoQDIuSFQurWCeXAxZIn1rS2-c4DzK26Xb9A') })
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );
    
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}