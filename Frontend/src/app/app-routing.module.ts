import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { HomeGroceryComponent } from './components/home-grocery/home-grocery.component';
import { LoginComponent } from './components/login/login.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { WishlistItemsComponent } from './components/wishlist-items/wishlist-items.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeGroceryComponent,
    canActivate:[AuthGuard]
  }, 
  {
    path: 'add',
    component: AddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'view',
    component: ProductViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'cart',
    component: CartViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'order',
    component: OrderViewComponent,
    canActivate:[AuthGuard]
  },  
  {
    path: 'user-view',
    component: UserViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'wishlist',
    component: WishlistItemsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
