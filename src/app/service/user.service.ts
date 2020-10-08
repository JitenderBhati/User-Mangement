import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../dto/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {}

  fetchAllRegisterdUser() {
    return this.http
      .get(environment.api_endpoint + environment.getRegisteredUser, {
        observe: 'response',
      })
      .subscribe((data) => console.log(data));
  }

  fetchUserById(id: number): User {
    return null;
  }

  removeUserById(id: number) {}
}
