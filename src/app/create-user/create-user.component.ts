import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { AppService } from '../app.service';
import { UserService } from '../user-list/user-list.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public editUser: any;
  public userName = 'New User';
  public formGroup: FormGroup;
  public isEdit = false;

  constructor(
    public router: Router,
    private appService: AppDataService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.editUser = this.appService.getUserData();
    if (this.editUser == null || this.editUser == '') {
      this.formGroup = new FormGroup(
        {
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          email: new FormControl('')
        });
    } else {
      this.isEdit = true;
      this.userName = this.editUser['firstName'];
      this.formGroup = new FormGroup(
        {
          firstName: new FormControl(this.editUser['firstName']),
          lastName: new FormControl(this.editUser['lastName']),
          email: new FormControl(this.editUser['email'])
        });
    }
  }

  onSubmit(data) {
    console.log(" test " + this.formGroup.get('firstName').value);
    const user = {
      firstName: this.formGroup.get('firstName').value,
      lastName: this.formGroup.get('lastName').value,
      email: this.formGroup.get('email').value,
      id: this.isEdit ? this.editUser.id : 0
    }
    if (!this.editUser) {
      var isSuccess = false;
      this.userService.create(user).subscribe(
        data => {
          isSuccess = data;
          if (isSuccess)
            window.alert("User creation Successful");
          else
            window.alert("User creation failed");
          this.router.navigate(['users']);
        });
    }
    else {
      var isSuccess = false;
      this.userService.update(user).subscribe(
        data => {
          isSuccess = data;
          if (isSuccess)
            window.alert("User update Successful");
          else
            window.alert("User update failed");
          this.router.navigate(['users']);
        });
    }
  }

  onCancel() {
    this.router.navigate(['users']);
  }

  onDelete() {
    var isSuccess = false;
    this.userService.delete(this.editUser.id).subscribe(data => {
      isSuccess = data;
      if (isSuccess)
        window.alert("User deletion Successful");
      else
        window.alert("User deletion failed");
      this.router.navigate(['users']);
    });
  }
}
