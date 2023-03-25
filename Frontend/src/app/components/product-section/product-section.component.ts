import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {
  @Input() products:any;
  @Input() carouselDetails:any;
  wishlistPresent:boolean=false;

  amount:any=0;
  cartProduct:any;
  dialog:any={message:'', title:'', visibility:false};
  constructor(public api:LoginApiService, private router:Router){}

  ngOnInit(): void {
   console.log(this.products);
   
  }

  onCheckOut(event:any){   
    this.router.navigate(['cart']);
  }

  onNewProductsAdded(event:any){
    console.log(this.api.cartProduct);
    
  }

  onProductWishlisted(event:any){
   if(event.length > 0){
    this.wishlistPresent = true;
   }else{
    this.wishlistPresent = false;
   }
  }

  onCart(event:any){
    this.cartProduct = this.api.cartProduct;
    this.dialog.title = 'Cart details';
    this.dialog.visibility = true;
  }

  onCloseCart(event:any){
    this.dialog.visibility = false;
  }

  onWishlist(event:any){
    this.router.navigate(['wishlist']);
  }



}
