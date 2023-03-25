import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Name } from 'src/app/models/api-models';
import { ApiService } from 'src/app/services/api.service';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-home-grocery',
  templateUrl: './home-grocery.component.html',
  styleUrls: ['./home-grocery.component.css']
})
export class HomeGroceryComponent implements OnInit {  
  carouselDetails:any;
  products:any;
  productsSub:Subscription;
  productName:Name;
  category:string;
  productCategory:any;
  name:string;
  constructor(public api: LoginApiService, private service:ApiService) { }
  
  ngOnInit(): void {    
    this.carouselDetails = this.api.carouselDetails; 
    this.service.getProducts();
    this.productsSub = this.service.getPostUpdateListener()
    .subscribe((data:any)=>{
      this.products = data;
      this.api.allPages = this.products;  
      this.products.forEach((item:any)=>{
        item.isWishlist=false;
      });        
    })
  }

 

    
}


