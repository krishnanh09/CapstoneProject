import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
  constructor(public api: LoginApiService) { }
  
  @Output() productAddedToCart = new EventEmitter<any>();
  @Output() productWishlisted = new EventEmitter<any>();
  @Input() product: any;
  quantity:any='';

  onAddToCart(event: any) {
    if (this.api.cartProduct.length === 0) {
      this.product.quantity = this.quantity;
      this.api.cartProduct.push(this.product);
    } else {
      let index = this.api.cartProduct.findIndex((record: any) => record.id === this.product.id);
      if (index > -1) {
        this.api.cartProduct.splice(index, 1);
      }
      this.product.quantity = this.quantity;
      this.api.cartProduct.push(this.product);      
      this.productAddedToCart.emit(true);
    }
  }

  isWishlistClicked(event: any) {
    debugger
    this.product.isWishlist = !this.product.isWishlist;
    if(this.product.isWishlist)
    {
      this.api.wishProduct.push(this.product);
    }else
    {
      let wishlistedProductPresent = this.api.wishProduct.filter((x:any)=>x.productName === this.product.productName);
      if(wishlistedProductPresent){
        let index = this.api.wishProduct.findIndex((x:any)=>x.productName === this.product.productName);
        this.api.wishProduct.splice(index, 1);
      }
    }
    this.productWishlisted.emit(this.api.wishProduct);
    

    // this.api.productDetails.forEach((item: any, index: any) => {
    //   if (item.id === this.product.id && item.isWishlist === false) {
    //     this.api.productDetails[index].isWishlist = true;
    //   } else if (item.id === this.product.id && item.isWishlist === true) {
    //     this.api.productDetails[index].isWishlist = false;
    //   }
    // });
    // let wishlistProducts: any = [];
    // this.api.productDetails.forEach((item: any) => {
    //   if (item.isWishlist === true) {
    //     wishlistProducts.push(item);
    //   }
    // });
    // this.api.wishProduct = wishlistProducts;
  }
}
