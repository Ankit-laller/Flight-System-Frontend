import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ForwarderComponent } from './forwarder/forwarder.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { MasterAirlineAddComponent } from './MasterAirlineAdd/MasterAirlineAdd.component';
import { MasterAirlineComponent } from './MasterAirline/MasterAirline.component';
import { SubUserComponent } from './SubUser/SubUser.component';

// const routes: Routes = [

//   {path:"", component:LayoutComponent ,children:[
//     {path:"search-flight",component:SearchFlightComponent, canActivate:[AuthGuardGuard]},
//     {path:"book-flight",component:BookFlightComponent, canActivate:[AuthGuardGuard]},
//     {path:"booked-flight",component:ForwarderComponent, canActivate:[AuthGuardGuard]},
//     {path:'', redirectTo:"login",pathMatch:'full' },
//   ], canActivate:[AuthGuardGuard]},
//   {path:"login", component:LoginComponent},
//   {path:"register",component:RegisterComponent},
//   {path:'', redirectTo:"login",pathMatch:'full' },
//   {path:"**", redirectTo:"/login"}

// ];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'createSub',
    component: SubUserComponent, canActivate:[AuthGuardGuard]
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuardGuard],
  //   children: [
      {
        path: 'search-flight',
        component: SearchFlightComponent,
      },
      {
        path: 'book-flight',
        component: BookFlightComponent,
      },
      {
        path: 'booked-flight',
        component: ForwarderComponent,
      },
  //   ],
  // },
  {path:"masterAirline",component:MasterAirlineComponent, canActivate:[AuthGuardGuard]},
  {path:"masterAddAirline", component:MasterAirlineAddComponent, canActivate:[AuthGuardGuard]},
  
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
