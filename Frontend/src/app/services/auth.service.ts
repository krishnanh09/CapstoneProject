import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin:boolean =false;
  private isAuthenticated: boolean = false;
  private adminListener = new Subject<boolean>();
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private user:any;
  private userListener = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAdmin(){
    return this.isAdmin;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserListener(){
    return this.userListener.asObservable();
  }

  getAdminListener(){
    return this.adminListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signUp", authData)
      .subscribe(response => {
        console.log(response);
      })
  }

  getUserDetails(){
    this.http.get("http://localhost:3000/api/user")
    .subscribe((res:any)=>{
      this.user = res.user;
      this.userListener.next(this.user);
    })
  }

  deleteUser(userId:string){
    this.http
    .delete('http://localhost:3000/api/user/' + userId)
    .subscribe(()=>{
      const updatedUser = this.user.filter((user:any) => user._id !== userId);
      this.user.user = updatedUser;
      this.userListener.next(this.user);      
    });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number, userType:string }>("http://localhost:3000/api/user/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {        
        const expiresIn = response.expiresIn;
        const userType = response.userType;
        this.setAuthTimer(expiresIn);
        this.isAdmin = response.userType === 'admin'?true:false;
        console.log(this.isAdmin);
        this.isAuthenticated = true;
        this.adminListener.next(this.isAdmin);
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate, userType);
        this.router.navigate(['home']);
      }
    });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['login']);
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation!.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token:string, expirationDate:Date, userType:string){
    localStorage.setItem("userType", userType);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userType = localStorage.getItem("userType");
    if(!token || !expirationDate || !userType){
      return;
    }
    return {
      token:token,
      expirationDate:new Date(expirationDate),
      userType: userType
    }
  }
}


