import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isParent = true;
  constructor(private router:Router) { }

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
    this.router.navigateByUrl("/login")
  }
  createSub(){
    this.router.navigateByUrl("/createSub")
  }

}
