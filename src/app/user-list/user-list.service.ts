import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(public http: HttpClient){}

    public getUsers():Observable<any> {
        return this.http.get("https://localhost/api/User") ;
    }

    public create(user:User) {
        return this.http.post<boolean>(`https://localhost/api/User`,user);
    }

    public update(user:User) {
        return this.http.put<boolean>(`https://localhost/api/User`,user);
    }

    public delete(id:number) {
        return this.http.delete<boolean>(`https://localhost/api/User?Id=${id}`);
    }
}