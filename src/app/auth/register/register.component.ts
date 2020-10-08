import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import { RegisterUserDetails } from '../../dto/registerUserDetails';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'um-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription = new Subject();
  registerUserDetails: RegisterUserDetails;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registerUserDetails = {
      name: '',
      password: '',
      email: '',
      role: 'User',
    };
  }

  registerUser(form: NgForm) {
    console.log(this.registerUserDetails);
    this.authenticationService
      .registerUser(this.registerUserDetails)
      .pipe(takeUntil(this.subscription))
      .subscribe((reponse) => {
        if (reponse.status == 201) {
          this.router.navigate(['/auth', 'login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
