import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Project } from "./project.module";

@Injectable()
export class ProjectService {

    constructor(public http: HttpClient){}

    public getProjects():Observable<any> {
        return this.http.get("https://localhost/api/Project") ;
    }

    public create(project: Project) {
        return this.http.post<boolean>(`https://localhost/api/Project`,project);
    }

    public update(project:Project) {
        return this.http.put<boolean>(`https://localhost/api/Project`,project);
    }

    public delete(id:number) {
        return this.http.delete<boolean>(`https://localhost/api/Project?Id=${id}`);
    }
}