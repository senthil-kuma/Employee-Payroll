import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../Service/employee.service";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { Subscription } from "rxjs";
import { AddEmployeeComponent } from "../addEmployee/addEmployee.component";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
  })

  export class EmployeeComponent implements OnInit{
    modalRef: MdbModalRef<AddEmployeeComponent> | null = null;
    datas:any={};

    constructor(private service:EmployeeService,private modalService: MdbModalService,private router:Router,
      private service1:LoginService){
        // this.userSub=this.service1.loggedInUserDetails.subscribe((data)=>{
        //   console.log(data)
        //   this.datas= data;
        // })
        let id = this.service1.loggedInUserId;
        console.log(id)

      //  this.userSub = this.service.get('employees/'+id).subscribe((empData)=>{
      //     console.log(empData)
      //          this.datas=empData;
      //          console.log(this.datas)
      //    })

      this.service.getDocumentById(id).then((empData)=>{
              this.datas=empData.data();
              console.log(this.datas)
   
      })
       }
unsub:Subscription
userSub:Subscription
    ngOnInit(){

      
    }

    ngOnDestroy(): void {
   
      if(this.unsub) this.unsub.unsubscribe();
      if(this.userSub) this.userSub.unsubscribe();
      
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
onLogout() {
    
  this.service1.logout().subscribe({next:()=>{
      localStorage.removeItem('employee');
      
      this.router.navigate(['login']);
      
  }, error:(err)=>{
    console.log(err)
  }})
}

}
