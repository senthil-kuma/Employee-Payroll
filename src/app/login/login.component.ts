import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isloading = false;
  error: string = '';

  constructor(private logService: LoginService, private router: Router) {

  }

  onSubmit(form: NgForm) {
    this.error = '';
    this.isloading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.logService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.isloading = false;
        })
      )
      .subscribe({
        next: (resData) => {
          console.log(resData);
          let empData: any = {
            empem: resData.email,
            empid: resData.reloadUserInfo.localId,
          };
          localStorage.setItem('employee', JSON.stringify(empData));
          if (empData.empid == 'Y64FBpy0LAeGHp5z6NRXVj3Dunz1') {
            this.router.navigate(['employee-list']);
          } else {
            this.router.navigate(['employee']);
          }

        },
        error: (message) => {
          this.error = message;
          console.log(message);
        },
      });
  }

  
}
