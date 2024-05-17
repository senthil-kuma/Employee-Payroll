import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { LoginService } from '../login/login.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { EmployeeService } from '../Service/employee.service';
import { NgForm } from '@angular/forms';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './addEmployee.component.html',
  styleUrl: './addEmployee.component.scss',
})
export class AddEmployeeComponent implements AfterViewInit {
  error1: string = 'invalid credentials';
  items: any = {};
  title: any = '';
  data: any;
  isLoading = false;
  error: string = null;

  @ViewChild('f') ngform: NgForm;

  constructor(
    public modalRef: MdbModalRef<AddEmployeeComponent>,
    private http: HttpClient,
    private loginService: LoginService,
    private fireStore: Firestore,
    private eService: EmployeeService
  ) {}
  ngAfterViewInit(): void {
    console.log(this.items);
    console.log(typeof this.items);
    if (this.items?.id?.length) {
      setTimeout(() => {
        this.ngform.setValue({
          firstName: this.items.firstName,
          lastName: this.items.lastName,
          email: this.items.email,
          mNo: this.items.mNo,
          pass: this.items.pass,
          depart: this.items.depart,
          dest: this.items.dest,
          place: this.items.place,
          pos: this.items.pos,
          role: this.items.role,
          img: '',
        });
        console.log(this.items.img);
        this.url = this.items.image;
      }, 500);
    }
  }

  email: any;
  createPost(f) {
    let formdata = f.value;
    formdata['image'] = this.url;

    if (this.items?.id?.length) {
      const docInstance = doc(this.fireStore, 'employees', this.items.id);
      updateDoc(docInstance, formdata)
        .then(() => {
          console.log('data updated');
          this.modalRef.close();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const email = f.value.email;
      const password = f.value.pass;
      const auth = getAuth();
      console.log(auth);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user: any = userCredential['_tokenResponse'];
          formdata['image'] = this.url;
          console.log(user);
          console.log(userCredential);
          console.log(formdata);

          let id = userCredential.user.uid;
          formdata['id'] = id;

          this.eService
            .set(`employees/${id}`, formdata)
            .then(() => {
              console.log('Data has been saved successfully');

              this.modalRef.close();
              f.reset();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    console.log(f.value);
  }
  url: any = '../../assets/Images/profile.png';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();


      reader.readAsDataURL(event.target.files[0]);

      console.log(event.target.files[0].name);

      reader.onload = (event) => {
        this.url = event.target.result;
        this.data = this.url;
      };
    }
  }

  choosefile(fileLoader: any) {
    fileLoader.click();
  }
}
