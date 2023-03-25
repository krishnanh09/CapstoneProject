import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onLoading:boolean = false;
  email: any;
  password: any;
  isLoginClicked: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private router: Router, public loginService: LoginApiService, public authService:AuthService) { }  

  loginUser(event: any) {
    if(this.loginForm.invalid){
      return;
    }
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;  
    this.onLoading = true; 
    this.authService.loginUser(this.email, this.password);
  }

  signUp(event: any) {
    if(this.loginForm.invalid){
      return;
    }
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;   
    this.authService.createUser(this.email, this.password);
  }

  ngOnInit(): void {

  }

}
