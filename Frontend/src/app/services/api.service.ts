import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Products } from '../models/api-models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productOrder:any;
  private productOrderUpdated = new Subject<any>();
  private products:any[] =[];
  private productUpdated = new Subject<Products[]>();
  constructor(private http:HttpClient) { }

  getProducts(){
    this.http
    .get<{message:string,product:any}>('http://localhost:3000/api/products')
    .pipe(map((productData)=>{
      return productData.product.map((product:any) =>{
        return {
          productName:product.productName,
          category:product.category,
          price:product.productPrice,
          id:product._id,
          image:product.image
        };
      });
    }))
    .subscribe((transformedData:any)=>{
      this.products = transformedData; 
      this.productUpdated.next([...this.products]);
    });
  }

  getPostUpdateListener(){
    return this.productUpdated.asObservable();
  }

  getProductOrderUpdatedListener(){
    return this.productOrderUpdated.asObservable();
  }

  addProducts(name:string, category:string, price:string){
    const product:Products = {id:'', productName:name, productPrice:price, category:category, image:''};
    this.http
    .post<{message:string, productId:string}>('http://localhost:3000/api/products',product)
    .subscribe((data:any)=>{      
      const productId = data.productId;
      product.id= productId;
      this.products.push(product);
      this.productUpdated.next([...this.products]);
    });   
  }  

  updateProducts(id:string, name:string, category:string, price:string ){
    const product:Products ={ id:id , productName:name, category:category, productPrice:price, image:'' };
    this.http
    .put<{message:string, productId:string}>('http://localhost:3000/api/products/' + id,product)
    .subscribe((data:any)=>{
      const updatedProduct = [...this.products];
      const oldProductIndex = updatedProduct.findIndex(p => p.id === product.id);
      updatedProduct[oldProductIndex] = product;
      this.products = updatedProduct;
      this.productUpdated.next([...this.products]);
    });
  }

  deleteProducts(productId:string){
    this.http
    .delete('http://localhost:3000/api/products/' + productId)
    .subscribe(()=>{
      const updatedProduct = this.products.filter(product => product.id !== productId);
      this.products = updatedProduct;
      this.productUpdated.next([...this.products]);      
    });
  }

  createOrder(item:any){
    const order:any = item;
    this.http
    .post<{message:string, orderId:string}>('http://localhost:3000/api/orders', order)
    .subscribe((data:any)=>{
      this.productOrder = data;
      this.productOrderUpdated.next(this.productOrder);
    })
  }

  getOrder(){
    this.http.get("http://localhost:3000/api/orders")
    .subscribe((res:any)=>{
      this.productOrder = res;
      this.productOrderUpdated.next(this.productOrder);
    })
  }

}
