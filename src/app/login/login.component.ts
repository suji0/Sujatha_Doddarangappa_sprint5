import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName = '';
  public password = '';
  constructor(
    private router: Router,
    private  loginService: LoginService
  ) {}

  public onSubmit()
  {
    var isSuccess = false;
    this.loginService.login(+this.userName,this.password).subscribe(data => {
      isSuccess = data;
    if(isSuccess) {
      window.alert("Login Successfull!!!");
    this.router.navigate(['users']);
    }
    else {
      window.alert("Login Failed!!!!");
    }
  });
  }
}
