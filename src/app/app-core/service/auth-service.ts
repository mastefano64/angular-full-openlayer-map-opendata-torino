import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  public authenticatedAsync = this.authSubject.asObservable();
  public authenticated = false;

  constructor(private http: HttpClient) { }

  authreset(): void {
    this.authenticated = false;
    this.authSubject.next(false);
  }

  login(username: string, password: string): Observable<object> {
    let data = { username: username, password: password };
    return this.http.post("/auth/login", data).pipe(
      map(response => {
        this.authenticated = <boolean>response;
        this.authSubject.next(<boolean>response);
        return response;
      })
    );
  }

  logout(): Observable<object> {
    return this.http.get("/auth/logout").pipe(
      map(response => {
        this.authenticated = <boolean>response;
        this.authSubject.next(<boolean>response);
        return response;
      })
    );
  }

  error1(): Observable<object> {
    return this.http.get("/auth/error1");
  }

  error2(): Observable<object> {
    return this.http.get("/auth/error2");
  }
}
