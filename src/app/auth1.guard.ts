import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  
  constructor( private router: Router,private serve : LoginService) {}

  canActivate(): boolean {
    let userState= JSON.parse(localStorage.getItem('userState'))
    let user = JSON.parse(localStorage.getItem('employee'))
    let admin = user && user.empid == 'Y64FBpy0LAeGHp5z6NRXVj3Dunz1' ? true : false;
    console.log(userState)
     console.log(admin)
     console.log(userState && admin)
     //userState && admin ?  this.router.navigate(['/employee']) : this.router.navigate(['/employee-list'])
      return userState && admin;
   
  }
}

// export class Auth3{
//   canActivate(): boolean {
//     let emp= JSON.parse(localStorage.getItem('employee'))
//     console.log(emp)
//     if (emp.empid == 'Y64FBpy0LAeGHp5z6NRXVj3Dunz1') {
//       return false
//     } else {
//       return true
//     }
//  }
// }


