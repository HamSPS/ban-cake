import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, last } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService, private authService: AuthService,
        private route: ActivatedRoute
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.tokenService.getToken();

        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    const pathList = ['sign-in', 'password', 'forgot-password', 'change-password', 'verification'];
                    const lastSegment = request.url.substring(request.url.lastIndexOf('/') + 1);

                    if (!pathList.includes(lastSegment)) {
                        this.authService.signOut();
                        location.reload();
                    }
                }

                return throwError(() => error);
            })
        );
    }
}
