import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ComponentRef, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightModel } from '../data/FlightModel';
import Swal from 'sweetalert2';
import { BookingServiceService } from '../services/bookingService.service';
import { Modal } from 'bootstrap'; 
import { AuthenticationService } from '../services/Authentication.service';
import { User } from '../data/interface';
import { Page } from 'ngx-pagination';
@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent implements OnInit, OnDestroy {
  editMode=false
  isLast=false;  
  pageNumber=1;
  totalPages=[];
  bookedFlightsData:FlightModel[]=[]
  bookingData:FlightModel ={} as FlightModel
  updationForm:FormGroup
  forwarderDetails:User ={} as User
  @ViewChild('exampleModal') closebutton;
  @ViewChild('container',{read:ViewContainerRef, static:true}) container!:ViewContainerRef;
  @ViewChild('exampleModal') updationModal!: ElementRef; 
  @ViewChild("previousButton", { static: false }) previousButtonRef!: ElementRef;
  @ViewChild("nextButton", { static: false }) nextButtonRef!: ElementRef;

  
   myModal = document.getElementById("detailsModal")
  modalInstance!: Modal; 
  
  
  constructor( private fb:FormBuilder, private authService:AuthenticationService, private bookingService:BookingServiceService,
   
  ) { 
    this.updationForm = this.fb.group({
      cargoWeight:["",Validators.required],
      cargoType:["",Validators.required]
    })
    
  }
  ngOnDestroy(): void {
    this.bookingService.clearData()
  }
 

  ngOnInit() {
    debugger
    this.getData(1)
    console.log(this.totalPages[-1])

    // if(this.previousButtonRef){
    //   this.previousButtonRef.nativeElement.disabled =true
    // }
  }
  ngAfterViewInit() {
    // debugger
    // if (this.previousButtonRef) {
    //   this.renderer.setStyle(this.previousButtonRef.nativeElement, 'background-color', 'grey');
    //   this.renderer.setStyle(this.previousButtonRef.nativeElement, 'color', 'white');
      
    // }
  }
  naviagate(){
    // this.router.navigateByUrl("/book-flight")
  }
  
  getData(PageNumber){
    // debugger
    this.totalPages=[]
    this.pageNumber=PageNumber;
    
    console.log(this.pageNumber)
    this.bookingService.getBookings(PageNumber).subscribe(r=>{
      this.bookedFlightsData=r.flightBookingData
      debugger    
        let i=1;
        for(i;i<=r.length/this.bookingService.getPageSize();i++){
          this.totalPages.push(i)
        }
        if(r.length%this.bookingService.getPageSize()>0){
          this.totalPages.push(i);
        }
      
    })
  }
  //manual pagination functionality
  previousPageData(){
    debugger
    if(this.pageNumber>1){
      this.pageNumber-=1;
    this.getData(this.pageNumber)
    }else{
      if(this.previousButtonRef){
        this.previousButtonRef.nativeElement.disabled =true
      }
    }
  }
  nextPageData(){
    debugger
    this.pageNumber+=1
    if(this.pageNumber<=this.totalPages.length){
    this.getData(this.pageNumber)
    return
    }
    this.pageNumber-=1;
  }
  

  openForm(data){
    this.bookingData=data
    this.authService.getUserById(data.bookedBy).subscribe(r=>{
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
         this.getData(1);
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
            this.getData(1)
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
  
  
 
  
}
