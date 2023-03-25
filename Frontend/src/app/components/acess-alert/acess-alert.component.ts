import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acess-alert',
  templateUrl: './acess-alert.component.html',
  styleUrls: ['./acess-alert.component.css']
})
export class AcessAlertComponent implements OnInit {
  constructor(private router:Router){}
  @Input() dialog:any={message:'You have no access to view this content. Please contact Administrator.', title:'Warning', visibility:false};
  ngOnInit(): void {
    
  }

  onAccept(event:any){
    this.dialog.visibility = false;
    this.router.navigate(['home']);
  }

}
