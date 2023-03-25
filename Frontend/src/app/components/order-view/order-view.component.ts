import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, OnDestroy {
  constructor(private service:ApiService){}
  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
  orders:any;
  orderSub:Subscription;
  amount:any=0;
  index:any;
  isTableVisible:boolean=false;
  selectedOrder:any;

  onCancel(event:any){}

  displayItems(event:any,id:any){    
   this.index = this.orders.find((x:any)=>x._id === id);
   this.selectedOrder = this.index.product;
   this.selectedOrder.forEach((item:any)=>{
    this.amount +=  (item.price * item.quantity);   
   });   
   this.isTableVisible = true;    
  }

  ngOnInit(): void {
    this.service.getOrder();
    this.orderSub = this.service.getProductOrderUpdatedListener()
    .subscribe(res=>{
      this.orders = res.order;
      console.log(this.orders);

    });      
  }
}
