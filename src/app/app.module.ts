import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './addEmployee/addEmployee.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { EmployeeService } from './Service/employee.service';
import { LoginService } from './login/login.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { EmployeeComponent } from './employee/employee.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';


// fireStore link : https://console.firebase.google.com/project/employee-1adf1/firestore/databases/-default-/data/~2Femployees~2FCicZyDXb2uYKYZ1CO8TtGjdhgoj2

const firebaseConfig = {
  apiKey: 'AIzaSyAS5d9dEjqnAEWPMEv2t8-nVMd3aHurNTU',
  authDomain: 'employee-1adf1.firebaseapp.com',
  databaseURL: 'https://employee-1adf1-default-rtdb.firebaseio.com',
  projectId: 'employee-1adf1',
  storageBucket: 'employee-1adf1.appspot.com',
  messagingSenderId: '986278814919',
  appId: '1:986278814919:web:84d261dcb2973d61f3cae2',
  measurementId: 'G-B9WPK645K0',
};

@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    AddEmployeeComponent,
    LoadingSpinnerComponent,
    EmployeeComponent,
    
    
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  
    MdbDropdownModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MdbModalModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    CommonModule,
    MdbRippleModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgOptionHighlightModule
    
  ],
  providers: [EmployeeService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
