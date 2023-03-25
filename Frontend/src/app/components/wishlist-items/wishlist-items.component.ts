import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.css']
})
export class WishlistItemsComponent implements OnInit {
  wishlist:any;
  constructor(private api:LoginApiService, private router:Router){}
  ngOnInit(): void {
    this.wishlist = this.api.wishProduct;
  }

  
  onHome(event:any){
    this.router.navigate(['home']);
  }
}
