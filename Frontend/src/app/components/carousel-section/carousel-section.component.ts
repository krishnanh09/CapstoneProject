import { Component, OnInit, Input } from '@angular/core';
import { LoginApiService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.css']
})
export class CarouselSectionComponent implements OnInit {
  @Input()carouselDetails:any;

  constructor(public api:LoginApiService){}
  ngOnInit(): void {
  
  }

}
