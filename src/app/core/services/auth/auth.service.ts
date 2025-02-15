import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {jwtDecode}  from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor( private httpClient:HttpClient ,private router:Router) { }

  userData:any=null;

  sendRegestraionForm(data:object):Observable<any> {
   return this.httpClient.post(`${environment.baseURL}/api/v1/auth/signup`,data);
  }
  sendLoginForm(data:object):Observable<any> {
   return this.httpClient.post( `${environment.baseURL}/api/v1/auth/signin`,data);
  }

  saveUserData():void{
    if(localStorage.getItem('user token') !== null){
       this.userData = jwtDecode (localStorage.getItem('user token')!);
       console.log(this.userData);

    }
  }


  logOut():void
  {
    localStorage.removeItem('user token');
    this.userData=null;
    this.router.navigate(['/login'])
  }


  setEmailVerfiy(data:object):Observable<any>{
      return this.httpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`,data)
  }
  setCodeVerfiy(data:object):Observable<any>{
      return this.httpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`,data)
  }
  setNewPassword(data:object):Observable<any>{
      return this.httpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`,data)
  }

}
