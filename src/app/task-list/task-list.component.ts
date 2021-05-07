import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { AppService } from '../app.service';
import { ProjectService } from '../project-list/project.service';
import { UserService } from '../user-list/user-list.service';
import { TaskService } from './task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{
 
  constructor(
    public router: Router,
    private appService: AppDataService,
    private taskService: TaskService){}
  
  public columnDefs = [
    { field: 'id' },
    { field: 'projectID' },
    { field: 'detail'},
    {field: 'assignedToUserID'},
    {field: 'status'},
    {field: 'createdOn'}
];
public rowData = null;

ngOnInit(): void {
  this.taskService.getTasks().subscribe(data=> this.rowData = data);
}

public edit(rowData){
  console.log(rowData.data);
  this.appService.editTask(rowData.data);
  this.router.navigate(['createTask']);
}
}
