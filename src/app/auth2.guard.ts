import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard {
  
  constructor( private router: Router,private serve : LoginService) {}

  canActivate(): boolean {
    let userState= JSON.parse(localStorage.getItem('userState'))
    let roles= this.serve.loggedInRole;
    console.log(roles)
    let admin = roles  == 'admin' ? true : false;
    console.log(userState)
     console.log(admin)
     console.log(userState && !admin)
      return userState && !admin;
   
  }
}



