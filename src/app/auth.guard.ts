import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor( private router: Router,private serve : LoginService) {}

  canActivate(): boolean {
    let userState= JSON.parse(localStorage.getItem('userState'))
    console.log(userState)
    if(userState) {
     //let empData = JSON.parse(localStorage.getItem('employee'))
      return false;
    } else {
      return true;
    }
  }
}

