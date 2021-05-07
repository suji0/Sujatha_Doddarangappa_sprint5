import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    public editUserData: any = null;
    public editProjectData: any = null;
    public editTaskData: any = null;

    public editUser(userData) 
    {
        this.editUserData = userData;
    }

    public editTask(taskData) 
    {
        this.editTaskData = taskData;
    }

    public editProject(projectData) 
    {
        this.editProjectData = projectData;
    }

    public getUserData(){
        return this.editUserData;
    }

    public getProjectData(){
        return this.editProjectData;
    }

    public getTaskData(){
        return this.editTaskData;
    }

}