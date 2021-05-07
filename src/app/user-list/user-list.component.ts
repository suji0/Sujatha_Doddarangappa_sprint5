import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { UserService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
 public columnDefs = [
    { field: 'id' },
    { field: 'firstName' },
    { field: 'lastName'},
    {field: 'email'}
];

public rowData;
constructor( 
  private router: Router,
  private appService: AppDataService,
  private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe( data => this.rowData = data);
    console.log("rowdata"+ this.rowData);
  }

public onCreate() {
  this.router.navigate(['createUser']);
}

public edit(rowData){
  this.appService.editUser(rowData.data);
  this.router.navigate(['createUser']);
  console.log(rowData.data);
}

}
