import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-SubUser',
  templateUrl: './SubUser.component.html',
  styleUrls: ['./SubUser.component.css']
})
export class SubUserComponent implements OnInit {
  registrationData = {
    name: '',
    email: '',
    password: '',
    userType: localStorage.getItem("userType"),
    parentId:localStorage.getItem("currentUserId")
   
  };
  constructor(private http: HttpClient, private router:Router) {}
 
  ngOnInit(): void {}
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    userType: new FormControl(localStorage.getItem("userType")),
    parentId: new FormControl(localStorage.getItem("currentUserId")),
  });
  get Name(): FormControl{
    return this.registerForm.get("name") as FormControl;
  }
 
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
 
  get UserType(): FormControl{
    return this.registerForm.get("userType") as FormControl;
  }
 
  get Password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  blockSpaces(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }
  registeredSubmit() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, register me in!"
    }).then((result) => {
      debugger

      if (result.isConfirmed) {
        this.http
      .post<{success:boolean,message:string}>('https://localhost:7156/api/User/createSubUser', this.registerForm.value)
      .subscribe(
        (response) => {
          if(response.success){
            Swal.fire({
              title: "Registered",
              text: response.message,
              icon: "success"
            });
            if(localStorage.getItem("userType")==="Airline"){
              this.router.navigateByUrl("/masterAirline")
            }else{
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
  }})
   
    
  }

}
