import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookedFlightResponse, FlightModel, FlightUpadtionResponse } from '../data/FlightModel';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  private dataSubject = new BehaviorSubject(null);
  private flightsDataSubject= new BehaviorSubject(null);
  private showTableSubject = new BehaviorSubject(false);
  private NoFlightSubject= new BehaviorSubject(false);
  private inputValuesSubject = new BehaviorSubject(null);
  inputValues = this.inputValuesSubject.asObservable()
  showTable =this.showTableSubject.asObservable()
  noFlight= this.NoFlightSubject.asObservable();
  HandleTable(showTable, noFlight){
    this.showTableSubject.next(showTable)
    this.NoFlightSubject.next(noFlight)
    // sessionStorage.setItem("showTable", showTable.toString())
    // sessionStorage.setItem("noFlight", noFlight.toString())
  }
  availibleFlights = this.flightsDataSubject.asObservable();
  flightData= this.dataSubject.asObservable();
  clearData(){
    this.inputValuesSubject.next("")
    this.HandleTable(false,false)
    this.flightsDataSubject.next('')

  }
  private PageSize=5;
  private baseUrl="https://localhost:7156/api/";
  getPageSize(){
    return this.PageSize
  }
constructor(private http:HttpClient) { }
sendFLightData(data:any){
  this.dataSubject.next(data)
}
saveAvailibleFlightsData(data:any){
  this.flightsDataSubject.next(data)
}
saveInputValues(data:any){
  this.inputValuesSubject.next(data)
} 
searchFlihgts(data){
  return this.http.post<FlightModel[]>(this.baseUrl+'FlightBooking/SearchFlight', data)
}
bookFlight(data){
  return  this.http.post(this.baseUrl+"FlightBooking/bookflight",data)
}
updateBooking(id,data){
  return this.http.put<FlightUpadtionResponse>(`${this.baseUrl}FlightBooking/updateBooking/${id}`,data)
}
getBookings( PageNumber){
  return this.http.get<BookedFlightResponse>(`${this.baseUrl}FlightBooking/getBooking?PageNumber=${PageNumber}&PageSize=${this.PageSize}`)
}
cancelBooking(id){
 return this.http.delete<FlightUpadtionResponse>(this.baseUrl+"FlightBooking/"+id)
}

}
