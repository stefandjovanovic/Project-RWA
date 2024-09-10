import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {selectUser} from "../store/auth/auth.selectors";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectUser).pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth'])
      }));
  }
}
