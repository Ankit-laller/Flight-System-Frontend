import { Component, ComponentRef, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightModel, FlightUpadtionResponse } from '../data/FlightModel';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BookingServiceService } from '../services/bookingService.service';
@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {

 @Input() bookingData:FlightModel ={} as FlightModel
 @Input() componentRef!: ComponentRef<UpdateBookingComponent>;
 @Output() close = new EventEmitter<boolean>()
 @ViewChild("closeModelBtn", { static: false }) buttonRef!: ElementRef;
 updationForm:FormGroup
  constructor( private fb:FormBuilder, private bookingService:BookingServiceService) { 
    this.updationForm = this.fb.group({
      cargoWeight:["",Validators.required],
      cargo:["",Validators.required]
    })
  }

  ngOnInit() {
    if (this.bookingData) {
      this.updationForm.patchValue({
        cargoWeight: this.bookingData.cargoWeight,
        cargo: this.bookingData.cargo
      });
    }
  }
  closeModel(){
    debugger
    if (this.buttonRef) {
      this.buttonRef.nativeElement.click(); 
    }
  }
  onSubmit(){
    console.log(this.updationForm.value)
    if(this.updationForm.valid){
      Swal.fire({
        title: "Are you sure?",
        text: "Flight details will be updated after clicking, Yes!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
      }).then((result) => {
        if(result.isConfirmed){
          this.bookingService.updateBooking(this.bookingData.flightId,this.updationForm.value).subscribe(r=>{
            debugger
            if(r.success){
              Swal.fire({
                title: "Updated!",
                text: r.message,
                icon: "success",
                backdrop: false,
                allowOutsideClick: false, 
              }) 
              this.closeModel()   
              this.close.emit(true)
            }else{
              Swal.fire({
                title: "Updated!",
                text: r.message,
                icon: "warning",
                backdrop: false,
                allowOutsideClick: false, 
              }) 
            }
          })
        }
      })
      
    }

  }

}
