import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app.data-service';
import { AppService } from '../app.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(
    public router: Router,
    private appService: AppDataService,
    private projectService: ProjectService){}
  public columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'detail'},
    {field: 'createdOn'}
];

public rowData = null;


ngOnInit(): void {
  this.projectService.getProjects().subscribe(data=> this.rowData = data);
}

public edit(rowData){
  this.appService.editProject(rowData.data);
  this.router.navigate(['createProject']);
  console.log(rowData.data);
}
}
