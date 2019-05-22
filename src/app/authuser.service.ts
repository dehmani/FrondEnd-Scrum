import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

import {Observable} from 'rxjs';
@Injectable()
export class AuthuserService {
  title = 'app';
  response : any ;
  token : any ; 
  logoutResponse : any ;
  isLogedin : boolean=false;
  checkResponse: any={checkToken : 'false'} ;
  currentUser: any = null;

  constructor(private http: HttpClient) {
  
   }

  public isLoggedIn() {
  this.checkResponse.checkToken = false
  this.token = "";
  const data ={}
  this.token = '?auth='+window.localStorage['jwtToken'];
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'text/html',
    })
};

  this.http.post('http://127.0.0.1:8000/user/AuthCheck'+this.token,"",httpOptions).subscribe(res => 
  {
  //  this.isLogedin = false ;
    //this.currentUser = false;
      this.checkResponse = res ;
      if(this.checkResponse.status === true)
      {
        this.isLogedin = true ;
        this.currentUser = true;
      }
      else  
      {
        this.isLogedin = false ;
        this.currentUser = false;

      }
      return this.isLogedin
  });
  

  }

}
