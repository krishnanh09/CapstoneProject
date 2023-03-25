import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/api-models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  verifyAdmin:boolean = false;
  warningDialog:any={message:'You have no access to view this content. Please contact Administrator.', title:'Warning', visibility:false};
  productId:any;
  editProduct:any;
  products:any=[];
  productSub:Subscription;
  dialog:any={visibility:false,title:''};
  categories: any = [
    {
      id: 1,
      name: 'Fruits'
    },
    {
      id: 2,
      name: 'Vegetables'
    },
    {
      id: 3,
      name: 'Bakery'
    }
  ]
  constructor(public api:ApiService){}

  ngOnInit(): void {
    let userType = localStorage.getItem("userType");
    if(userType === 'admin'){
      this.verifyAdmin = true;
    }else{
      this.verifyAdmin = false;      
    }
    if(this.verifyAdmin){
      this.api.getProducts();
      this.productSub = this.api.getPostUpdateListener()
      .subscribe((product:Products[])=>{
        this.products = product;        
      });    
    }else{
      this.warningDialog.visibility = true;
    }  
  }

  onEdit(event:any, product:any){
    this.productId = product.id;
    const categories = this.categories.filter((x:any)=>x.name === product.category );
    let formattedProduct={
      productName:product.productName,
      price:product.price,
      category:categories[0]
    }    
    this.editProduct = formattedProduct;
    console.log(formattedProduct);
    this.dialog.title = 'Edit Product';
    this.dialog.visibility=true;
  }

  onDelete(event:any,product:any){
    this.api.deleteProducts(product.id);    
  }

  onUpdatedProduct(event:any){
    this.dialog.visibility = false;
  }

  ngOnDestroy(): void {
    if(this.verifyAdmin){
      this.productSub.unsubscribe();
    }   
  }

}
