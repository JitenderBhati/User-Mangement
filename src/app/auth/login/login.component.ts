import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { LoginDetails } from '../../dto/loginDetails';
import { StorageHelper } from '../../service/storageHelper';

@Component({
  selector: 'um-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription = new Subject();
  loginDetails: LoginDetails;

  constructor(
    private authenticationService: AuthenticationService,
    private storageHelper: StorageHelper
  ) {}

  ngOnInit(): void {
    this.loginDetails = { email: '', password: '' };
  }

  loginUser() {
    this.authenticationService
      .loginUser(this.loginDetails)
      .pipe(takeUntil(this.subscription))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
