import { Component, OnInit, Injectable } from '@angular/core';
import { signup,Login } from '../logininfo'
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { ViewContainerRef } from '@angular/core';
import { AuthuserService } from '../authuser.service'

@Injectable()
//export class AuthService {}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signup = new signup();
  login = new Login();
  signupResponse: any = "null";
  loginResponse: any;
  userList: any ;
  json: any ;
  surnom: string;
  nom: string;
  username: string;
  password: string;
  email: string;

  constructor( private http: HttpClient,private router: Router,vcr: ViewContainerRef, public s: AuthuserService )
   { 
//    this.toastr.setRootViewContainerRef(vcr);
    }
saveToken(token: string) 
  {
    window.localStorage['jwtToken'] = token;
  }

ngOnInit() 
  {

  }
  onSubmitLogin()
  {
    const formData = new FormData();
    //formData.append('_username',this.login._username);
    //formData.append('_password',this.login._password);
    this.json = "json"
    //alert(this.json);
    this.http.post('http://127.0.0.1:8000/user/login?json={"email" : "'+this.login._username+'" , "password" : "'+this.login._password+'"}',"").subscribe(res => 
    {
      this.loginResponse = res
      console.log(res);
      if( (typeof this.loginResponse !== "object") && (this.loginResponse !== null) )
      {
          this.saveToken(this.loginResponse);
           this.s.currentUser=true;
          this.router.navigate(['']);
          alert("Welcome")
        }else{
          alert("Wrong Mail or Password")
        }
    });
  
  }
onSubmitSignUp()
  {     const formData = new FormData();
    this.json = "json"
    this.http.post('http://127.0.0.1:8000/user/new?json={"nom": "'+this.nom+'" , "surnom": "'+this.surnom+'"   ,  "email" : "'+this.email+'" , "password" : "'+this.password+'"}',"").subscribe(res => 
    {
      this.signupResponse = res
      console.log(res);
      if(this.signupResponse.success==true)

      {
          alert("Welcome you can login with your account")
          this.router.navigate(['home']);

        }else{
          alert("Something is Going wrong please retry")
        }
    });

























































    /*
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
    Order deny,allow
    Deny from all
</IfModule>


    this.http.post('http://127.0.0.1:8000/users/signup',this.signup).subscribe(res => {
    this.signupResponse = res
    if(this.signupResponse.success==true)
    {
      this.saveToken(this.signupResponse.token);
      if (this.signupResponse.token)
      {
     //   this.s.currentUser=true;
        this.router.navigate(['home']);
      }
      else
      {
        alert('i dont know ');
      }
    }
    else
    {
     alert('i dont know ');    }
    });
*/
  }

/*
list()
  {
    this.http.get('http://127.0.0.1:8000/users/list').subscribe(res => this.userList = JSON.stringify(res));
  }
logout()
  {
    this.http.get('http://127.0.0.1:8000/users/logout').subscribe(res => this.userList = JSON.stringify(res));
  }
  */
}