import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { User } from '../dto/user';
import { UserService } from '../service/user.service';

declare var $: any;
@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('close') closeModal: ElementRef;
  editField: string;
  showModal: boolean = false;
  selectedUser: User;
  roles: Array<String>;
  userData: Array<User> = [];
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    $('.uui-table.dynamic').dataTable();
    this.userData = this.userService.fetchAllRegisterdUser();
    this.roles = this.userService.roles;
  }

  updateUser() {
    console.log(this.selectedUser);
    this.closeModal.nativeElement.click();
  }

  editUser(id: number) {
    this.selectedUser = this.userService.fetchUserById(id);
    this.showModal = true;
  }

  remove(id: number, confirmation: boolean) {
    if (confirmation) {
      this.userService.removeUserById(id);
      this.userData.splice(id - 1, 1);
    }
  }
}
