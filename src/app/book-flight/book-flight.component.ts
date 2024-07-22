import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingServiceService } from '../services/bookingService.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
   

 cargoDetailForm:FormGroup
  flightData:any
  constructor(private location:Location,
    private bookingService:BookingServiceService, private http:HttpClient, private fb:FormBuilder, private router:Router) {  }
  ngOnInit() {
    this.bookingService.flightData.subscribe(r=>{
      this.flightData =r
      console.log(this.flightData)
   }) 
   this.cargoDetailForm = this.fb.group({
    cargo: [,Validators.required],
    cargoWeight:[,Validators.required],
  });
 
  }
 


  // isInputsValid(): boolean {
  //   if (this.cargoWeight === null || this.cargoType === null) {
  //     return false;
  //   }
 
  //   if (this.cargoWeight > this.flightData.cargoWeightLimit) {
  //     return false;
  //   }
  //   const typeRegex = /^[a-zA-Z]+$/;
  //   if (!typeRegex.test(this.cargoType)) {
  //     return false;  
  //   }
 
  //   return true;
  // }
  backbtn(){
    this.location.back()
  }
 
  bookFlight() {
    debugger

     if(this.cargoDetailForm.valid){
     const  data = {
        flightName: this.flightData.flightName,
        airlineName: this.flightData.airlineName,
        arrivalTime: this.flightData.arrivalTime,
        departureTime: this.flightData.departureTime,
        origin: this.flightData.origin,
        destination: this.flightData.destination,
        price: this.flightData.price,
        date: this.flightData.date,
        cargoWeight: this.cargoDetailForm.get('cargoWeight')?.value,
        CargoWeightLimit :this.flightData.cargoWeightLimit,
        cargo: this.cargoDetailForm.get('cargo')?.value,
        createdBy: this.flightData.createdBy,
        bookedBy:localStorage.getItem("currentUserId")
      }
      console.log(data)
      Swal.fire({
        title: "Are you sure?",
        text: "Flight will get booked after clicking, Yes!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, book it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.bookingService.bookFlight(data).subscribe(r=>{
            Swal.fire({
              title: "Booked!",
              text: "Your filght has been booked!",
              icon: "success",
              backdrop: false,
              allowOutsideClick: false, 
            }).then((result)=>{
              if(result.isConfirmed){
                this.router.navigateByUrl("/booked-flight")
              }
              
            })
           
        })
          
        }
      });
      
    } 
  }

  

  

}
