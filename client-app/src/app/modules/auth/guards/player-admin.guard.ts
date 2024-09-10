import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {selectRole} from "../store/auth/auth.selectors";

@Injectable({providedIn: 'root'})
export class PlayerAdminGuard{
  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectRole).pipe(
      take(1),
      map(role => {
        if(role === 'admin' || role === 'player'){
          return true;
        }else {
          return this.router.createUrlTree(['/events/halls'])
        }
      })
    )
  }
}
