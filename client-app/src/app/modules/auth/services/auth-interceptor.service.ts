import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {selectUser} from "../store/auth/auth.selectors";
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this.store.select(selectUser).pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const skipIntercept = req.headers.has('skip');

        if (skipIntercept) {
          const request = req.clone({
            headers: req.headers.delete('skip')
          });
          return next.handle(request);
        }

        const authToken = user.token;
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
