import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoginService } from './login/login.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'employee-payroll';
  isuserLogin: boolean = false;
  constructor(private serve: LoginService, private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log(user.email + ' user loged in');
        this.isuserLogin = true;
      } else {
        console.log('user logout');
        localStorage.removeItem('employee');
        this.isuserLogin = false;
      }
      localStorage.setItem('userState', JSON.stringify(this.isuserLogin));
    });
  }
}
