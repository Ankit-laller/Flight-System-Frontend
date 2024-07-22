import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingServiceService } from '../services/bookingService.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FlightInterface } from '../data/FlightInterfae';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit, OnDestroy {

  searchForm: FormGroup
  flightsData:any
  showTable:any
  NoFlights:any
  currentYear: number = new Date().getFullYear();
  cities = [ 'Mumbai','Delhi','Bangalore', 'Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Jaipur', 'Surat','Lucknow',"Goa"];
  originCity :any
  destinationCity:any
  date = new Date()
  choose="Choose..."
  
  today: string = new Date().toISOString().split('T')[0]; // Minimum date as today
  maxDate: string = '2757-12-31';

  constructor(private fb:FormBuilder, private http:HttpClient ,private router:Router,private bookingService:BookingServiceService)
   {
    this.searchForm= this.fb.group({
      origin:["", Validators.required],
      destination:["", Validators.required],
      date:["", [Validators.required , this.validateYearRange], ]
    })
    }
 
   

    subscription:Subscription
  ngOnInit() {
    debugger
    // const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    // const day = this.date.getDate().toString().padStart(2, '0');
    // this.today = `${this.date.getFullYear()}-${month}-${day}`;
    const searchedData = sessionStorage.getItem("searchedValues")
    const searchDataObj = JSON.parse(searchedData)
    this.searchForm.patchValue(searchDataObj)
    console.log(this.today)
    const availFlights = sessionStorage.getItem("filtghsData")
    const availFlightsObj = JSON.parse(availFlights)
    this.flightsData=availFlightsObj
    // this.subscription =this.bookingService.showTable.subscribe(r=>this.showTable=r)
    this.showTable = JSON.parse(sessionStorage.getItem("showTable"))
    this.NoFlights = JSON.parse(sessionStorage.getItem("noFlight"))
    // this.bookingService.noFlight.subscribe(r=>this.NoFlights=r)
  }
  ngOnDestroy() {
     
   
    // this.subscription.unsubscribe()

  }
//   filterData() {
//     const originSelect = document.getElementById('inputOrigin') as HTMLSelectElement;
//     const destinationSelect = document.getElementById('inputDestination') as HTMLSelectElement;

//     for (let i = 0; i < originSelect.options.length; i++) {
//         originSelect.options[i].disabled = false;
//     }
//     for (let i = 0; i < destinationSelect.options.length; i++) {
//         destinationSelect.options[i].disabled = false;
//     }

//     if (originSelect.value !== 'Choose...') {
//         for (let i = 0; i < destinationSelect.options.length; i++) {
//             if (destinationSelect.options[i].value === originSelect.value) {
//                 destinationSelect.options[i].disabled = true;
//             }
//         }
//     }

//     if (destinationSelect.value !== 'Choose...') {
//         for (let i = 0; i < originSelect.options.length; i++) {
//             if (originSelect.options[i].value === destinationSelect.value) {
//                 originSelect.options[i].disabled = true;
//             }
//         }
//     }
// }


get filteredCitiesForOrigin() {
  const destination = this.searchForm.get('destination')?.value;
  return this.cities.filter(city => city !== destination);
}

get filteredCitiesForDestination() {
  const origin = this.searchForm.get('origin')?.value;
  return this.cities.filter(city => city !== origin);
}
validateYearRange(control: AbstractControl) {
  const dateValue = control.value;
  if (!dateValue) return null; // If no date is provided, skip validation

  const year = new Date(dateValue).getFullYear();
  const currentYear: number = new Date().getFullYear();
  if (year < currentYear || year > 2757) {
    return { invalidYear: true }; 
  }
  return null; 
}





  handleSearch() {
    
    debugger
    // if (this.searchForm.invalid) {
    //   this.searchForm.markAllAsTouched();
    //   return;
    // }
    const searchedData = JSON.stringify(this.searchForm.value)
    sessionStorage.setItem("searchedValues",searchedData)
    
    console.log(this.searchForm.value)
    this.bookingService.saveInputValues(this.searchForm.value)
    this.bookingService.searchFlihgts(this.searchForm.value)
      .subscribe(response => {
        debugger
      const flightsData = JSON.stringify(response)
      sessionStorage.setItem("filtghsData", flightsData)
      this.flightsData = response
      //  this.bookingService.saveAvailibleFlightsData(response)
        console.log('flights found!', response);
        if(response.length ==0){
          this.NoFlights= true;
          this.bookingService.HandleTable(false, true)
          return
        }
        this.NoFlights=false
        this.showTable=true
        this.bookingService.HandleTable(true,false);
      })
  }
  navigate(data){
    this.bookingService.sendFLightData(data)
    this.router.navigateByUrl("/book-flight")
  }


  

}
