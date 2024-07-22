import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../data/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

private baseUrl = 'https://localhost:7156/api/';
 
  constructor(private http: HttpClient) {}
 
  getUserById(id){
    return this.http.get<LoginResponse>(this.baseUrl+"User/"+id)
  }

}
