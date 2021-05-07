import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Task } from "./task.model";

@Injectable()
export class TaskService {

    constructor(public http: HttpClient){}

    public getTasks():Observable<any> {
        return this.http.get("https://localhost/api/Task") ;
    }

    public create(task:Task) {
        return this.http.post<boolean>(`https://localhost/api/Task`,task);
    }

    public update(task:Task) {
        return this.http.put<boolean>(`https://localhost/api/Task`,task);
    }

    public delete(id:number) {
        return this.http.delete<boolean>(`https://localhost/api/Task?Id=${id}`);
    }
}