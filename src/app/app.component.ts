import { Component,OnInit, Injectable } from '@angular/core';
import { signup } from './logininfo'
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { AuthuserService } from './authuser.service'
import { IfObservable } from 'rxjs/observable/IfObservable';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scrum-app';
  address = new signup();
  response : any ;
  token : any ; 
  logoutResponse : any ;
  checkResponse: any={checkToken : 'false'} ;
  items: Observable<any[]>;
  constructor(private http: HttpClient, private router: Router, public s: AuthuserService){
    this.ngOnInited();
  }
ngOnInit(){}

ngOnInited()
  {
    this.s.isLoggedIn();
  }
  

}
