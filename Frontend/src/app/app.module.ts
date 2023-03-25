import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeGroceryComponent } from './components/home-grocery/home-grocery.component';
import { GroceryHeaderComponent } from './components/grocery-header/grocery-header.component';
import { ProductComponent } from './components/product/product.component';
import { ProductSectionComponent } from './components/product-section/product-section.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { CarouselSectionComponent } from './components/carousel-section/carousel-section.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { WishlistItemsComponent } from './components/wishlist-items/wishlist-items.component';
import { AcessAlertComponent } from './components/acess-alert/acess-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeGroceryComponent,
    GroceryHeaderComponent,
    ProductComponent,
    ProductSectionComponent,    
    AddProductComponent,
    ProductViewComponent,
    EditProductComponent,
    CartViewComponent,
    OrderViewComponent,
    CarouselSectionComponent,
    UserViewComponent,
    WishlistItemsComponent,
    AcessAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ProgressSpinnerModule,
    InputTextareaModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
