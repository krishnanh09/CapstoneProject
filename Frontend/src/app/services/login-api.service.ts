import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  constructor() { }
  loggedIn:boolean = false;
  product:any;
  usercart:any;
  productPage:any;
  allPages:any;
  selectedSection:any='Home';
  carouselDetails:any = [{
    image: "../../../assets/images/Biscuit.jpg",
    captionHeader: "Big Biscuit Deals",
    captionDescription: "Buy 2 and Get 2 Free..."
  },
  {
    image: "../../../assets/images/Fruits.jpg",
    captionHeader: "Fruits at Low Prices",
    captionDescription: "Get upto 50% Off on Fruits..."
  },
  {
    image: "../../../assets/images/Vegetables.jpg",
    captionHeader: "Vegetables Offer",
    captionDescription: "Get upto 40% Off on All Vegetables"
  }]

  productImages:[
    {
      id:1,
      image:"../../../assets/images/TomatoT.jpg",
      productName:'Tomato'
    },
    {
      id:2,
      image:"../../../assets/images/PotatoP.jpg",
      productName:'Potato'
    },
    {
      id:3,
      image:"../../../assets/images/CarrotC.jpg",
      productName:'Carrot'
    },
    {
      id:4,
      image:"../../../assets/images/OnionO.jpg",
      productName:'Onion'
    },
    {
      id:5,
      image:"../../../assets/images/AppleA.jpg",
      productName:'Apple'
    },
    {
      id:6,
      image:"../../../assets/images/OrangeO.jpg",
      productName:'Orange'
    },
    {
      id:7,
      image:"../../../assets/images/GrapesG.jpg",
      productName:'Grapes'
    },
    {
      id:8,
      image:"../../../assets/images/MangoM.jpg",
      productName:'Mango'
    },
    {
      id:9,
      image:"../../../assets/images/CarrotCakeCC.jpg",
      productName:'Carrot Cake'
    },
    {
      id:10,
      image:"../../../assets/images/ChocolateCakeCC.jpg",
      productName:'Chocolate Cake'
    },
    {
      id:11,
      image:"../../../assets/images/StrawberryIceCreamSIC.jpg",
      productName:'Strawberry IceCream'
    },
  ]
  productDetails:any=[
    {
      id: 1,
      productName: 'Tomato',
      productPrice: 22,
      quantity: 0,
      category: 'Vegetables',
      image:"../../../assets/images/Tomato.jpg",
      isWishlist:false,    
    },
    {
      id: 2,
      productName: 'Potato',
      productPrice: 22,
      quantity: 0,
      category: 'Vegetables',
      image:"../../../assets/images/Tomato.jpg",
      isWishlist:false,     
    },
    {
      id: 3,
      productName: 'Beans',
      productPrice: 22,
      quantity: 0,
      category: 'Vegetables',
      image:"../../../assets/images/Tomato.jpg",
      isWishlist:false,      
    },
    {
      id: 4,
      productName: 'Carrot',
      productPrice: 22,
      quantity: 0,
      category: 'Vegetables',
      image:"../../../assets/images/Tomato.jpg",
      isWishlist:false,      
    },
  ]

cartProduct:any=[];
wishProduct:any=[];
  
}
