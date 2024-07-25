export interface FlightModel {
    flightId: string;
    flightName: string;
    airlineName: string;
    arrivalTime: string;
    departureTime: string;
    origin: string;
    destination: string;
    price: number;
    cargoWeight: number;
    cargoWeightLimit: number;
    createdBy: string;
    cargo: string;
    date: string; 
    bookedBy: string;
  }
  export interface FlightUpadtionResponse {
    success: boolean;
    message: string;
    flightBookingData: FlightModel;
  }

  export interface BookedFlightResponse{
    success:Boolean;
    message:string;
    flightBookingData: FlightModel[];
    length:number;

  }
  