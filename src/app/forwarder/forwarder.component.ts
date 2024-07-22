import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ComponentRef, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightModel } from '../data/FlightModel';
import Swal from 'sweetalert2';
import { BookingServiceService } from '../services/bookingService.service';
import { Modal } from 'bootstrap'; 
import { AuthenticationService } from '../services/Authentication.service';
import { User } from '../data/interface';
@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent implements OnInit {
  editMode=false
  bookedFlightsData:FlightModel[]=[]
  bookingData:FlightModel ={} as FlightModel
  updationForm:FormGroup
  forwarderDetails:User ={} as User
  @ViewChild('exampleModal') closebutton;
  @ViewChild('container',{read:ViewContainerRef, static:true}) container!:ViewContainerRef;
  @ViewChild('exampleModal') updationModal!: ElementRef; 
   myModal = document.getElementById("detailsModal")
  modalInstance!: Modal; 
   $: any; // Declare jQuery
  constructor( private fb:FormBuilder, private authService:AuthenticationService, private bookingService:BookingServiceService) { 
    this.updationForm = this.fb.group({
      cargoWeight:["",Validators.required],
      cargoType:["",Validators.required]
    })
    
  }
  // ngAfterViewInit(): void {
  //   this.modalInstance = new Modal(this.updationModal.nativeElement);
  // }
 

  ngOnInit() {
    this.getData()
  }
 
  naviagate(){
    // this.router.navigateByUrl("/book-flight")
  }
  getData(){
    this.bookingService.getBookings().subscribe(r=>{
      this.bookedFlightsData=r
    })
  }
  

  openForm(data){
    debugger
    this.bookingData=data
    this.authService.getUserById(data.bookedBy).subscribe(r=>{
      debugger
     if(r.success){
    
      this.forwarderDetails = r.user
     }
    })

  }


  
  openModal(data){
    this.container.clear();
    const componentType = UpdateBookingComponent;
    const componentRef= this.container.createComponent(componentType);
    const instance = componentRef.instance as UpdateBookingComponent;
    instance.bookingData = data;
    instance.componentRef = componentRef; 
    // this.modalInstance.show()
    instance.close.subscribe((result:boolean)=>{
      debugger
      console.log("value from child ",result)
      if(result){
         this.getData();
      }   
     
    })

  }
  cancelBooking(id){
    debugger
    Swal.fire({
      title: "Are you sure?",
      text: "Booking will be canceled after clicking, Yes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel Booking!"
    }).then((result) => {
      if(result.isConfirmed){
        this.bookingService.cancelBooking(id).subscribe(r=>{
          if(r.success){
            Swal.fire({
              title: "Booking Canceled!",
              text: r.message,
              icon: "success",
            })
            this.getData()
          }else{
            Swal.fire({
              title: "Booking not Canceled!",
              text: r.message,
              icon: "success",
            })
          }
        })
        
      }
    })
  }
  
  
  // close(){
  //   if (this.componentRef) {
  //     this.componentRef.destroy(); 
  //     this.getData()
  //   }
  // }
  
}
