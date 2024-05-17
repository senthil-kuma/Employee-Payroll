import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Service/employee.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit {

  path:string="Skills/euf1BFJm4s4V39VH3wFY"
constructor(private eservice:EmployeeService){

}
  empSkills:string[]=[];
textBoxValue: any;
subscription:Subscription;
  ngOnInit() {
  
   this.subscription= this.eservice.get(this.path ).subscribe((data:any)=>{
console.log(data.skils)
this.empSkills=data.skils;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription)    this.subscription.unsubscribe();

  }

  async addSkill(text:string){
    this.empSkills.push(text)
    this.textBoxValue=''
    this.eservice.set(this.path,{ skils : this.empSkills})

    
  }
  
  deleteSkill(val) {
    // console.log(i)

    this.eservice.deleteSkill(val,"Skills","euf1BFJm4s4V39VH3wFY");
  }


}