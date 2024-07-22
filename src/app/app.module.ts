import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForwarderComponent } from './forwarder/forwarder.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterComponent } from './Register/Register.component';
import { LoginComponent } from './Login/Login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasterAirlineAddComponent } from './MasterAirlineAdd/MasterAirlineAdd.component';
import { MasterAirlineComponent } from './MasterAirline/MasterAirline.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { SubUserComponent } from './SubUser/SubUser.component';
import { UpdateBookingComponent } from './update-booking/update-booking.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [											
    AppComponent,
      ForwarderComponent,
      BookFlightComponent,
      RegisterComponent,
      LoginComponent,
      MasterAirlineAddComponent,
      MasterAirlineComponent,
      SearchFlightComponent,
      LayoutComponent,
      SubUserComponent,
      UpdateBookingComponent,
      NavbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,   
    
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
