import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-grocery-header',
  templateUrl: './grocery-header.component.html',
  styleUrls: ['./grocery-header.component.css']
})
export class GroceryHeaderComponent implements OnInit, OnDestroy {
  onLoading:boolean = false;
  userIsAuthenticated:boolean = false;
  isAdmin:boolean = false;
  authListenerSubs:Subscription;  
  adminListener:Subscription;
  @Output () sectionChanged = new EventEmitter<any>();
  constructor(private router:Router, public api:LoginApiService, private authService:AuthService){}
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.adminListener.unsubscribe();
  }
  ngOnInit(): void {   
    this.isAdmin = this.authService.getIsAdmin();
    this.userIsAuthenticated = this.authService.getIsAuth();
     this.authListenerSubs = this.authService.getAuthStatusListener()
     .subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;            
     });
     this.adminListener = this.authService.getAdminListener()
     .subscribe(admin=>{
      this.isAdmin = admin;
     });
  }

  onClickSection(event:any, section:any){ 
    debugger
    console.log(section)  
    this.api.selectedSection = section;
    this.api.allPages.forEach((item:any, index:any)=>{
      if(item.category === this.api.selectedSection){
        this.api.productPage = this.api.allPages[index];        
        console.log(this.api.productPage)
      }
    })
    this.sectionChanged.emit(section);
    this.router.navigate(['section']) ;    
  }

  onHome(event:any){
    this.router.navigate(['home']);
  } 

  onAdd(event:any){
    this.router.navigate(['add']);
  } 

  onView(event:any){
    this.router.navigate(['view']);
  } 
  onUsers(event:any){
    this.router.navigate(['user-view']);
  } 


  onOrders(event:any){
    this.router.navigate(['order']);
  }

  onLogout(event:any){
    this.onLoading = true;
    this.authService.logout();
  }

  onLogin(event:any){
    this.router.navigate(['login']);
  }
}
