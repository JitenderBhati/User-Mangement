import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../dto/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  users: Array<User> = [
    {
      id: 1,
      name: 'Jitender',
      email: 'jkrajput24@gmail.com',
      password: 'mydesire',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Nisha',
      email: 'nisha@gmail.com',
      password: 'mydesire',
      role: 'User',
    },
  ];

  roles: Array<String> = ['Admin', 'User'];
  fetchAllRegisterdUser(): Array<User> {
    return this.users;
  }

  fetchUserById(id: number): User {
    return this.users.find((user) => user.id == id);
  }

  removeUserById(id: number) {
    this.users.splice(id - 1, 1);
  }
}
