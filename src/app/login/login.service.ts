import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

export interface LoginResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: true;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  loggedInRole: string = '';
  loggedInUserId: string = '';
  constructor(private http: HttpClient, private auth: Auth) {}

  login(email: string, password: string) {
    return new Observable<any>((observable) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          observable.next(user);
        })
        .catch((error) => {
          observable.error(error);
        });
    });
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid email-id';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect Password';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'INVALID_LOGIN_CREDENTIALS';
        break;
    }
    return throwError(errorMessage);
  }

  deletePost(idToken: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAS5d9dEjqnAEWPMEv2t8-nVMd3aHurNTU',
        {
          idToken: idToken,
        }
      )
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<void> {
    return new Observable((observable) => {
      signOut(this.auth)
        .then(() => {
          observable.next();
          observable.complete();
        })
        .catch((error) => {
          observable.error(error);
        });
    });
  }
}

// getData():Observable<any>{
//   return  new Observable<any> =  (observe)=>{
//     this.http.get('https://employee-1adf1-default-rtdb.firebaseio.com/add.json').subscribe(post=>{
//     let data=[];
//     Object.keys(post).map((key)=>{
//       console.log(key)
//      // this.dataStore.storeEmployeeInfo(data[key]);
//     })
//     console.log(post)
//     observe.next(post);
//   })
//   }

// }
