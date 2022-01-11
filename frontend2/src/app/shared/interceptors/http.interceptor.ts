import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from '../services/shared.services';

@Injectable({
   providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
   constructor(private sharedServices: SharedService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.sharedServices.dispachData({ spinner: true });

      if (!req.headers.has('Content-Type')) {
         req = req.clone({
            headers: req.headers.set('Content-Type', 'application/json'),
         });
      }
      return next.handle(req).pipe(
         finalize(() => {
            this.sharedServices.dispachData({ spinner: false });
         })
      );
   }
}
