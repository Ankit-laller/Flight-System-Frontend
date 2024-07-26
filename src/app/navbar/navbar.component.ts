import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from '../services/bookingService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isParent = true;
  constructor(private router:Router, private bookingService:BookingServiceService) { }

  ngOnInit() {
   if(localStorage.getItem("isParent")==="true"){
    this.isParent = true;
   }else{
   this.isParent=false
   }
  }
  logout(){
    localStorage.clear()
    sessionStorage.clear()
    this.bookingService.clearData();
    this.router.navigateByUrl("/login")
  }
  createSub(){
    debugger
    this.bookingService.clearData()
    this.router.navigateByUrl("/createSub")
  }

}
