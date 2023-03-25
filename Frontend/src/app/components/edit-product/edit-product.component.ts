import { Component,Input, OnChanges, OnInit,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnChanges {
  @Input() id:any;
  @Input() product:any;
  @Output() productUpdated = new EventEmitter<any>();
  constructor(public api:ApiService){}
  ngOnChanges(changes: SimpleChanges): void {
    debugger
    // this.editForm.setValue(this.product);
  }
   

  ngOnInit(): void {
    this.editForm = new FormGroup({
      productName: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl('')
      // productImage:new FormControl('')
    })    
    this.editForm.setValue(this.product);
  }

  editForm: FormGroup;
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

  changeCategory(event:any){

  }

  changeImage(event:any){}


  
  onCancel(event:any){
    this.editForm.reset();
  }

  onSave(event:any){
    this.api.updateProducts(this.id,this.editForm.value.productName, this.editForm.value.category.name, this.editForm.value.price);
    this.editForm.reset();
    this.productUpdated.emit(true);
  }
}
