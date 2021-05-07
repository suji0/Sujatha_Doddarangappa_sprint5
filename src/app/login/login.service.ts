import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class LoginService {
    constructor(public httpClient: HttpClient)
{}

public login(userId: number,password: string) : Observable<any>{
    return this.httpClient.get<boolean>(`https://localhost/api/Login?userId=${userId}&password=${password}`);
}
}
