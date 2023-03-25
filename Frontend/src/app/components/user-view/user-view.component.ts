import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
  user: any;
  userSub: Subscription;
  verifyAdmin: boolean = false;
  dialog:any={message:'You have no access to view this content. Please contact Administrator.', title:'Warning', visibility:false};
  constructor(private authService: AuthService) { }
  ngOnDestroy(): void {
    if(this.verifyAdmin){
      this.userSub.unsubscribe();
    }   
  }

  ngOnInit(): void {   
    let userType = localStorage.getItem("userType");
    if(userType === 'admin'){
      this.verifyAdmin = true;
    }else{
      this.verifyAdmin = false;
    }
    
    if (this.verifyAdmin) {
      this.authService.getUserDetails();
      this.userSub = this.authService.getUserListener().subscribe((res: any) => {
        this.user = res;       
      });
    }else{
      this.dialog.visibility = true;
    }
  }

  onDelete(event: any, user: any) {
    this.authService.deleteUser(user._id);
  }

}
