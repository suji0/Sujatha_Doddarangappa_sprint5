import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { AppService } from '../app.service';
import { ProjectService } from '../project-list/project.service';
import { TaskService } from '../task-list/task-list.service';
import { STATUS } from '../task-list/task.model';
import { UserService } from '../user-list/user-list.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  public isEdit = false;
  public editTask: any;
  public taskName = 'New task';
  public formGroup: FormGroup;
  public projects = null;
  public users = null;
  public status = null;

  constructor(
    public router: Router,
    private appService: AppDataService,
    private taskService: TaskService,    
    private userservice: UserService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data=> this.projects = data);
    this.userservice.getUsers().subscribe(data => this.users = data );
    this.status = STATUS;
    this.editTask = this.appService.getTaskData();
    if (this.editTask == null || this.editTask == '') {
      this.formGroup = new FormGroup(
        {
          projectName: new FormControl(''),
          userName: new FormControl(''),
          details: new FormControl(''),
          status: new FormControl('')
        });
    }
    else {
      this.taskName = 'Update Task';
      this.isEdit = true;
      this.formGroup = new FormGroup(
        {
          projectName: new FormControl(this.editTask['projectID']),
          userName: new FormControl(this.editTask['assignedToUserID']),
          details: new FormControl(this.editTask['detail']),
          status: new FormControl(this.editTask['status'])
        });
    }
  }

  onSubmit(data) {
    console.log(this.formGroup.get('status').value);
    const task = {
      projectId: +this.formGroup.get('projectName').value,
      assignedToUserID: +this.formGroup.get('userName').value,
      detail: this.formGroup.get('details').value,
      id: this.isEdit ? this.editTask.id : 0,
      createdOn: this.isEdit ? this.editTask.createdOn : new Date(),
      status: !this.isEdit ? STATUS.New : +this.formGroup.get('status').value
    };
    var isSuccess = false;
    if (!this.isEdit) {
    this.taskService.create(task).subscribe(data => { isSuccess = data;
    if(isSuccess)
      window.alert(  "Task created successfully" );
    else
      window.alert("Task creation failed");
    this.router.navigate(['tasks']);
  });
    }
    else
    {
    this.taskService.update(task).subscribe(data => { isSuccess = data
    if(isSuccess)
      window.alert(  "Task updated successfully" );
    else
      window.alert("Task update failed");
    this.router.navigate(['tasks']);
  });
    }
  }

  onCancel() {
    this.router.navigate(['tasks']);
  }

  onDelete() {
    var isSuccess = false;
    this.taskService.delete(this.editTask.id).subscribe(data => { 
    isSuccess = data;
    if(isSuccess)
    window.alert(  "Task deleted successfully" );
    else
    window.alert("Task Deletion failed");
    
    this.router.navigate(['tasks']);
    });
  }
}
