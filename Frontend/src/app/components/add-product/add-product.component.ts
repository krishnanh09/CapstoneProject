import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  verifyAdmin:boolean = false;
  dialog:any={message:'You have no access to view this content. Please contact Administrator.', title:'Warning', visibility:false};
  imagePreview: string = '';
  fileList?: FileList | null;
  currentFile?: File | null;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    let userType = localStorage.getItem("userType");
    if(userType === 'admin'){
      this.verifyAdmin = true;
    }else{
      this.verifyAdmin = false;      
    }
    if(this.verifyAdmin){
      this.productForm = new FormGroup({
        productName: new FormControl(''),
        price: new FormControl(''),
        category: new FormControl('')      
      });
    }else{
      this.dialog.visibility = true;
    }    
  }

  productForm: FormGroup;
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

  changeCategory(event: any) {

  }

  changeImage(event: any) {
    this.fileList = event.target.files;
    this.currentFile = this.fileList?.item(0);
    if (this.fileList) {
      const file: File | null = this.fileList.item(0);
      if (file) {
        this.imagePreview = '';
        this.currentFile = file;
        this.productForm.value.productImage = this.currentFile;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  onCancel(event: any) {
    this.productForm.reset();
  }

  onSave(event: any) {    
    this.api.addProducts(this.productForm.value.productName, this.productForm.value.category.name, this.productForm.value.price);
    this.productForm.reset();
  }
}
