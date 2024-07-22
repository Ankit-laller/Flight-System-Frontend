import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginResponse } from '../data/interface';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 
  constructor(private http: HttpClient, private router:Router) { }
  loginForm = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  password: new FormControl("", [Validators.required, Validators.minLength(4)]),
  });
  ngOnInit(): void {
    if(localStorage.getItem("currentUserId")){
      if(localStorage.getItem("userType")==="Airline"){
        this.router.navigateByUrl("/masterAirline")
      }else{
        this.router.navigateByUrl("/search-flight")
      }
    }
  }
 
  get Password(): FormControl{
    return this.loginForm.get("password") as FormControl;
  }
  get Email(): FormControl{
    return this.loginForm.get("email") as FormControl;
  }
  blockSpaces(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }
  loginSubmit(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Login me in!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.http.post<LoginResponse>('https://localhost:7156/api/User/userLogin', this.loginForm.value).subscribe(
          (response) => {
            if(response.success){
              // debugger
              
              if(response.user.userType ==="Airline"){
                localStorage.setItem("userType", response.user.userType)
                localStorage.setItem("currentUserId",response.user.userId)
                localStorage.setItem("isParent", response.user.isParent.toString())
                this.router.navigateByUrl("/masterAirline")
              
              }else{Swal.fire({
                title: "Login",
                text:response.message,
                icon: "success"
              });
                localStorage.setItem("userType", response.user.userType)
                localStorage.setItem("currentUserId",response.user.userId)
                localStorage.setItem("isParent", response.user.isParent.toString())
                this.router.navigateByUrl("/search-flight")
              }
              
              
            }else{
              Swal.fire({
                title: "Error",
                text: response.message,
                icon: "error"
              });
            }       
          },
      
        );
      }
    });
  }
}
 
 
 


