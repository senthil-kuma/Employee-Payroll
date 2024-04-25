import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { EmployeeService } from '../Service/employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isloading = false;
  error: string = '';

  constructor(private logService: LoginService, private router: Router,private service:EmployeeService) {

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
          this.service.getDocumentById(empData.empid).then((res)=>{
                  let data:any= res.data()
                  
                  if (data.role === 'admin') {
                    this.logService.loggedInRole = 'admin';
                    this.router.navigate(['employee-list']);
                  } else {
                    this.logService.loggedInRole = 'employee';

                    this.router.navigate(['employee']);
                  }
                  console.log(data.role)
          })
          this.logService.loggedInUserId = empData.empid;
          console.log(empData.empid)
          

        },
        error: (err) => {
          if(err.message== 'Firebase: Error (auth/invalid-credential).'){
            this.error = 'Invalid login credentials'
          }
          console.log(this.error);
        },
      });
  }

  
}
