import { Component } from "@angular/core";
import { Router } from "@angular/router";



@Component({
    selector:'app-loading-spinner',
    template:'<div class="lds-ripple"><div></div><div></div></div>',
    styleUrls:['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent{
 constructor(private router:Router){}
ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout (() => {
        this.router.navigate(['login']);
    }, 5000);
}

}