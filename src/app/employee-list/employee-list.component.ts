import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddEmployeeComponent } from '../addEmployee/addEmployee.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginService } from '../login/login.service';
import { EmployeeService } from '../Service/employee.service';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  modalRef: MdbModalRef<AddEmployeeComponent> | null = null;
  unsubscribe:Subscription
  constructor(
    private modalService: MdbModalService,
    private service: EmployeeService,
    private fireStore: Firestore,
private router:Router,
private service1:LoginService  ) {}
  datas: any = [];
  ngOnInit() {
    this.getdatas();
  }

  ngOnDestroy(): void {

    if(this.unsubscribe){
      this.unsubscribe.unsubscribe();
    }
    
  }

  addEmployee() {
    this.modalRef = this.modalService.open(AddEmployeeComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
      modalClass: 'modal-top-center modal-lg',
      data: {
        title: 'Custom title',
      },
    });
  }

  delete(item) {
  
        const dataRef = doc(this.fireStore, 'employees', item.id);
        deleteDoc(dataRef).then(() => {
          console.log('Record deleted successfully!');
        });
      
    
  }

  updateData(item: string) {
    console.log(item);
    this.modalRef = this.modalService.open(AddEmployeeComponent, {
      ignoreBackdropClick: true,
      keyboard: false,
      data: {
        items: item,
      },
    });
  }

  getdatas() {
    
    
    this.unsubscribe=this.service.getList('employees').subscribe((res) => {
      this.datas = res;
      console.log(this.datas);
    })
    ;
  }

  onLogout() {
    
    this.service1.logout().subscribe({next:()=>{
        this.router.navigate(['login']);
    }, error:(err)=>{
      console.log(err)
    }})
  }
}
