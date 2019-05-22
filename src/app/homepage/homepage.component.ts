import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import { AuthuserService } from '../authuser.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(    private _location: Location,    public s: AuthuserService,

    ) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
}

logout(){
  window.localStorage.removeItem('jwtToken');
  this.s.currentUser=false 
}
}
