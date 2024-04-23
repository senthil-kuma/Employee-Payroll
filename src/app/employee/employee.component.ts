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

    constructor(private service:EmployeeService,private modalService: MdbModalService,private router:Router,
      private service1:LoginService){}
    datas:any=[];
unsub:Subscription
    ngOnInit(){
      this.getData()
    }

    ngOnDestroy(): void {
   
      if(this.unsub){
        this.unsub.unsubscribe();
      }
      
    }


getData(){
  let empEmai= JSON.parse( localStorage.getItem("employee"));
  this.unsub=this.service.getList('employees').pipe().subscribe((res:any)=>{
    this.datas = res;
    this.datas = this.datas.filter((empemail)=>empemail.email== empEmai.empem )[0]

    console.log(this.datas)
    })
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
