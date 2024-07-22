import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-MasterAirlineAdd',
  templateUrl: './MasterAirlineAdd.component.html',
  styleUrls: ['./MasterAirlineAdd.component.css'],
})
export class MasterAirlineAddComponent implements OnInit {
  destination=""
  origin=""
  selectedCity:any;
  constructor(private http: HttpClient,private router:Router) {}

  cities =  [ 'Mumbai','Delhi','Bangalore', 'Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Jaipur', 'Surat','Lucknow',"Goa"];

 
  airlineDetails = {
    origin: "",
    destination: "",
    arrivalTime: '',
    departureTime: '',
    date: '',
    airlineName: '',
    flightName: '',
    price: 0,
    cargoWeightLimit: 0,
    createdBy: localStorage.getItem("currentUserId"),
    flightId: 'sdass',
  };
 
  
  // {
  //   "flightId": "string",
  //   "origin": "string",
  //   "destination": "string",
  //   "arrivalTime": "string",
  //   "departureTime": "string",
  //   "airlineName": "string",
  //   "flightName": "string",
  //   "price": 0,
  //   "cargoWeightLimit": 0,
  //   "createdBy": "string",
  //   "date": "string"
  // }
 
  date = new Date();
  today: any;
  filterData() {
    const originSelect = document.getElementById('inputOrigin') as HTMLSelectElement;
    const destinationSelect = document.getElementById('inputDestination') as HTMLSelectElement;

    for (let i = 0; i < originSelect.options.length; i++) {
        originSelect.options[i].disabled = false;
    }
    for (let i = 0; i < destinationSelect.options.length; i++) {
        destinationSelect.options[i].disabled = false;
    }

    if (originSelect.value !== 'Choose...') {
        for (let i = 0; i < destinationSelect.options.length; i++) {
            if (destinationSelect.options[i].value === originSelect.value) {
                destinationSelect.options[i].disabled = true;
            }
        }
    }

    if (destinationSelect.value !== 'Choose...') {
        for (let i = 0; i < originSelect.options.length; i++) {
            if (originSelect.options[i].value === destinationSelect.value) {
                originSelect.options[i].disabled = true;
            }
        }
    }
}
  onSubmit() {
    debugger
    this.http
      .post('https://localhost:7156/api/Airline', this.airlineDetails)
      .subscribe((response) => {
        console.log('Airline details added successfully', response);
        this.router.navigateByUrl("/masterAirline")
      });
    console.log(this.airlineDetails);


  }
  ngOnInit() {
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const day = this.date.getDate().toString().padStart(2, '0');
    this.today = `${this.date.getFullYear()}-${month}-${day}`;
  }

  backButton(){
    this.router.navigateByUrl('/masterAirline')
  }
}
 
 