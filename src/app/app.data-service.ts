import { Injectable } from "@angular/core";

@Injectable()
export abstract class AppDataService {

    public abstract editUser(userData): void;
    public abstract editTask(taskData);
    public abstract editProject(projectData);

    public abstract getUserData();
    public abstract getProjectData();   
    public abstract getTaskData();

}