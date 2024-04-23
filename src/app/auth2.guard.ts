import { CanActivateFn } from '@angular/router';

export const EmployeeGuard: CanActivateFn = (route, state) => {
  let userState= JSON.parse(localStorage.getItem('userState'))
    let user = JSON.parse(localStorage.getItem('employee'))
    let admin = user && user.empid == 'Y64FBpy0LAeGHp5z6NRXVj3Dunz1' ? true : false;
    console.log(userState)
     console.log(admin)
     console.log(userState && !admin)
     //userState && admin ?  this.router.navigate(['/employee']) : this.router.navigate(['/employee-list'])
      return userState && !admin;
};
