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
  private PageSize=5;
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
  return this.http.post<FlightModel[]>('https://localhost:7156/api/FlightBooking/SearchFlight', data)
}
bookFlight(data){
  return  this.http.post("https://localhost:7156/api/FlightBooking/bookflight",data)
}
updateBooking(id,data){
  return this.http.put<FlightUpadtionResponse>(`https://localhost:7156/api/FlightBooking/updateBooking/${id}`,data)
}
getBookings( PageNumber){
  return this.http.get<BookedFlightResponse>(`https://localhost:7156/api/FlightBooking/getBooking?PageNumber=${PageNumber}&PageSize=${this.PageSize}`)
}
cancelBooking(id){
 return this.http.delete<FlightUpadtionResponse>("https://localhost:7156/api/FlightBooking/"+id)
}

}
