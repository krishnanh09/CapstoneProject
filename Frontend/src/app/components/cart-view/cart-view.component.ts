import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  constructor(private router:Router, private api:LoginApiService, private service:ApiService){}
  ngOnInit(): void {
    this.api.cartProduct.forEach((item:any)=>{
      this.amount +=  (item.price * item.quantity);
      console.log(this.amount);
    });
  }
  dialog:any={message:'',title:'', visibility:false};
  products:any=this.api.cartProduct;
  amount:any=0;

  onCancel(event:any){}

  onProceed(event:any){
    this.dialog.title = 'Order Confirmation';
    this.dialog.message = 'Do you wish to place your order?'
    this.dialog.visibility = true;
  }

  onOrderYes(event:any){
    this.dialog.visibility = false;
    console.log(this.api.cartProduct);
    this.service.createOrder(this.api.cartProduct);
    this.service.getProductOrderUpdatedListener()
    .subscribe((data:any)=>{
      this.dialog.title = 'Confirmed';
      this.dialog.message = `Your order is confirmed.  Your order no: is ${data.orderId}`;
      this.dialog.visibility = true;    
    })    
  }

  onOrderNo(event:any){
    this.dialog.visibility = false;
  }

  onOrderConfirmation(event:any){
    this.dialog.visibility = false;  
    this.router.navigate(['home']);
  }

}
