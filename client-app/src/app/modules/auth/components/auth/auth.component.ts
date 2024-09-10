import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {SignInUser} from "../../interfaces/signInUser.interface";
import {SignUpUser} from "../../interfaces/signUpUser.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthActions from "../../store/auth/auth.actions";
import {selectAuthState} from "../../store/auth/auth.selectors";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy{
  isSignInMode = true;
  isLoading = false;
  error: string | null= null;
  passwordMatches = true;
  signInUser: SignInUser = {
    email: '',
    password: ''
  }
  signUpUser: SignUpUser = {
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    username: ""
  }
  storeSub?: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select(selectAuthState).subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  ngOnDestroy() {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }


  onSwitchMode(form: NgForm){
    this.isSignInMode = !this.isSignInMode;
    this.error = null;
    form.resetForm();
  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }

    this.isLoading = true;

    if(this.isSignInMode){
      this.signInUser.email = form.value.login.email;
      this.signInUser.password = form.value.login.password;
      this.store.dispatch(AuthActions.signInStart(this.signInUser));
    }else{
      this.signUpUser.firstName = form.value.register.firstName;
      this.signUpUser.lastName = form.value.register.lastName;
      this.signUpUser.email = form.value.register.email;
      this.signUpUser.username = form.value.register.username;
      this.signUpUser.address = form.value.register.address;
      if(form.value.register.password != form.value.register.repeatPassword){
        this.passwordMatches = false;
        this.isLoading = false;
        return;
      }
      if(!this.isPasswordComplex(form.value.register.password)){
        this.error = "Password must contain at least one uppercase letter, one lowercase letter, one number or special character and be at least 8 characters long";
        this.isLoading = false;
        return;
      }
      this.passwordMatches = true;
      this.signUpUser.password = form.value.register.password;
      this.store.dispatch(AuthActions.signupStart(this.signUpUser));
    }

    form.resetForm();


  }

  private isPasswordComplex(password: string): boolean {
    const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordRegex.test(password);
  }
}
