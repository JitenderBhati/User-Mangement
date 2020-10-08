import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginDetails } from '../dto/loginDetails';
import { RegisterUserDetails } from '../dto/registerUserDetails';
import { environment } from '../../environments/environment';
import { StorageHelper } from './storageHelper';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<String>;
  public currentUser: Observable<String>;

  constructor(
    private http: HttpClient,
    private storageHelper: StorageHelper,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<String>(
      this.storageHelper.getFromLocalStorage('access_token')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }

  loginUser(loginDetails: LoginDetails): Observable<any> {
    return this.http
      .post(environment.api_endpoint + environment.login, loginDetails, {
        observe: 'response',
      })
      .pipe(
        tap((user) => {
          if (user.status == 200) {
            this.storageHelper.saveToLocalStorage(
              'access_token',
              user.headers.get('authorization')
            );
            this.currentUserSubject.next(user.headers.get('authorization'));
            this.router.navigate(['/user']);
          } else this.currentUserSubject.next(null);
        })
      );
  }

  registerUser(registerUserDetails: RegisterUserDetails): Observable<any> {
    return this.http.post(
      environment.api_endpoint + environment.registerUser,
      registerUserDetails,
      { observe: 'response' }
    );
  }

  logout() {
    this.storageHelper.clearLocalStorage();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth', 'login']);
  }
}
