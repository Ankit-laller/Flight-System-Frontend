import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightInterface } from '../data/FlightInterfae';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-MasterAirline',
  templateUrl: './MasterAirline.component.html',
  styleUrls: ['./MasterAirline.component.css'],
})
export class MasterAirlineComponent implements OnInit {
  // updatedValue: any;
  constructor(private http: HttpClient, private route: Router) {}
  updationData: FlightInterface = {} as FlightInterface;
  @ViewChild("closeModal") buttonRef:ElementRef
  ngOnInit() {
    this.fetchAirlineDetails();

    this.flightForm = new FormGroup({
      // id: new FormControl('123'),
      origin: new FormControl(this.updationData.origin, Validators.required),
      destination: new FormControl(this.updationData.destination, Validators.required),
      arrivalTime: new FormControl(this.updationData.arrivalTime, Validators.required),
      departureTime: new FormControl(this.updationData.departureTime, Validators.required ),
      airlineName: new FormControl( this.updationData.airlineName,Validators.required),
      flightName: new FormControl(this.updationData.flightName,Validators.required),
      price: new FormControl(this.updationData.price, Validators.required),
      cargoWeightLimit: new FormControl(this.updationData.cargoWeightLimit,Validators.required),
      date: new FormControl(this.updationData.date, Validators.required),
      createdBy: new FormControl('developer'),
    });
  }
  flightForm: FormGroup;
  cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Pimpri-Chinchwad',
    'Patna',
    'Vadodara',
    'Goa',
  ];
  airlineDetails: any;
  fetchAirlineDetails() {
    this.http.get('https://localhost:7156/api/Airline').subscribe(
      (response: any) => {
        debugger;
        this.airlineDetails = response;
      },
      (error) => {
        console.error('Error fetching airline details', error);
      }
    );
  }
  addFlight() {
    console.log('Add flight clicked');
    this.route.navigateByUrl('/masterAddAirline');
  }
  createSub() {
    this.route.navigateByUrl('/createSub');
  }
  logOut() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  deleteFlight(data: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed){
        const url = `https://localhost:7156/api/Airline/${data.flightId}`;
        this.http.delete(url).subscribe(
          (response) => {
            console.log(`Flight with ID deleted successfully`);
            this.fetchAirlineDetails();
            Swal.fire({
              title: "Update!",
              text: "Your file has been deleted!",
              icon: "success"
            });
          }
        );
      }
    })
   
  }
  UpdateFlight() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://localhost:7156/api/Airline/${this.updationData.flightId}`;
        this.http.put(url, this.flightForm.value).subscribe(
          (response) => {
            console.log(`Flight with ID updated successfully`);
            
            Swal.fire({
              title: "Update!",
              text: "Your file has been updated!",
              icon: "success"
            });
            if (this.buttonRef) {
              this.buttonRef.nativeElement.click(); 
            }
            this.fetchAirlineDetails();
          }     
        );
        
      }
    });    
  }
  editFlight(data: any) {
    debugger;

    this.updationData = data;
    console.log(data);
    this.flightForm.patchValue({
      origin: data.origin,
      destination: data.destination,
      arrivalTime: data.arrivalTime,
      departureTime: data.departureTime,
      airlineName: data.airlineName,
      flightName: data.flightName,
      price: data.price,
      date:data.date,
      cargoWeightLimit: data.cargoWeightLimit,
    });
  }
}
