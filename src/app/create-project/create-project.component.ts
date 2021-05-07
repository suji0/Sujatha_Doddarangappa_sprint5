import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { AppService } from '../app.service';
import { ProjectService } from '../project-list/project.service';
import { UserService } from '../user-list/user-list.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  public editProject: any;
  public projectName = 'New Project';
  public formGroup: FormGroup;
  public isEdit = false;

  constructor(
    public router: Router,
    private appService: AppDataService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.editProject = this.appService.getProjectData();
    if (this.editProject == null || this.editProject == '') {
      this.formGroup = new FormGroup(
        {
          name: new FormControl(''),
          details: new FormControl('')
        });
    } else {
      this.isEdit = true;
      this.projectName = this.editProject['name'];
      this.formGroup = new FormGroup(
        {
          name: new FormControl(this.editProject['name']),
          details: new FormControl(this.editProject['detail'])
        });
    }
  }

  onSubmit(data) {
    console.log(" test " + this.formGroup.get('name').value);
    const project = {
      name: this.formGroup.get('name').value,
      detail: this.formGroup.get('details').value,
      createdOn: this.isEdit ? this.editProject.createdOn : new Date(),
      id: this.isEdit ? this.editProject.id : 0
    };
    var isSuccess = false;
    if (!this.isEdit) {
      this.projectService.create(project).subscribe(data => {
        isSuccess = data;
        if(isSuccess)
        window.alert("Project created successfully");
        else
        window.alert("Project creation failed");
        this.router.navigate(['projects']);
      })
    }
    else {
      this.projectService.update(project).subscribe(data => {
        isSuccess = data;
        if(isSuccess)
        window.alert("Project updated successfully");
        else
        window.alert("Project updation failed");
        this.router.navigate(['projects']);
      })
    }
  }

  onCancel() {
    this.router.navigate(['projects']);
  }

  onDelete() {
    var isSuccess = false;
    this.projectService.delete(this.editProject.id).subscribe(data => 
    {
      isSuccess = data;
      if(isSuccess)
        window.alert("Project deleted successfully");
      else
        window.alert("Project deletion failed");
      this.router.navigate(['projects']);
    })
  }

}
