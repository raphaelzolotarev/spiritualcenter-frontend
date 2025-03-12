import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CacheInterceptor } from '../interceptor/cache.interceptor';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { UserService } from '../service/user.service';
import { HttpCacheService } from '../service/http.cache.service';

@NgModule({
    providers: [
        UserService, HttpCacheService, HttpClientModule,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
    ]
})
export class CoreModule { }