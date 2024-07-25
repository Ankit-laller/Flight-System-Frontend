import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
 
imports: [FormsModule, HttpClient];
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {}
 
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('[a-zA-Z]+'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    userType: new FormControl('a'),
  });
 
  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
 
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
 
  get UserType(): FormControl {
    return this.registerForm.get('userType') as FormControl;
  }
 
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
 
  registeredSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register me in!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Registered',
          text: 'Your have been successfully registered.',
          icon: 'success',
        });
      }
    });
  }
}
 