import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${req.url}`,
      withCredentials: false,
      responseType: 'json',
    });
    return next.handle(apiReq).pipe(
      catchError((error) => {
        console.error(error);
        this.handleAuthError(error);
        return of(error);
      }) as any,
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      console.error('handled error ' + error.status);
      this.router.navigate(['/']);
      sessionStorage.clear();
      return of(error.message);
    } else if (error.status === 403) {
      this.router.navigate(['/']);
    }
    throw error;
  }
}
