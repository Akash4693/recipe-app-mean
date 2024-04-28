import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = "http://localhost:5000/"

  constructor(private http:HttpClient) { }

  authSubject= new BehaviorSubject<any>({
    user:null
  })

  login(userData:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, userData)
  }

  register(userData:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData)
  }

  getUserProfile():Observable<any>{
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<any>(`${this.baseUrl}/api/user/profile`, {headers:header}).pipe(
      tap((user)=>{
        const currentState = this.authSubject.value;
        this.authSubject.next(({...currentState, user}))
      })
    )
  }

  logout(){
    localStorage.removeItem('jwt')
    this.authSubject.next({})
  }

}
