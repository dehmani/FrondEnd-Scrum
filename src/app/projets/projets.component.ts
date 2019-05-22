import {Inject,Component,OnInit,ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import {resolveDefinition} from '@angular/core/src/view/util';
import {NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  public token: string;
  public projectresponse: any;
  public projects = [];
  public projectName;
  public begindate;
  public endDate;
  public descreption;
  public user: any;
  public projectid: any;
  getupdateinfo: any;
  dialogRef: MatDialogRef < DialogEditProject, any > ;
  userstosubmit: any[];
  userstosubmitedit: any[];
  searchText;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private http: HttpClient) {}



  deleteproject(projectTodelete) {
      this.token = ""
      this.token = window.localStorage['jwtToken'];
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.token
          })
      };
      this.http.post(environment.url + '/deleteprojet/' + projectTodelete, httpOptions).subscribe(res => {
          alert("project deleted with success")
          this.http.get(environment.url + '/projet/listeProjet').subscribe(res => {
              this.projectresponse = res;
              this.projects = this.projectresponse[0];
          });
      });
  }


  //Edit Projet
  openDialogEdit(projectid): void {


      this.projectid = projectid;
      this.token = ""
      this.token =  window.localStorage['jwtToken'];
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.token
          })
      };

      let promise = new Promise((resolve, reject) => {
          this.http.get(environment.url + '/afficheprojet/' + this.projectid, httpOptions).subscribe(res => {
              this.getupdateinfo = res
              console.log(JSON.stringify(this.getupdateinfo.projet))
              resolve(this.getupdateinfo)
          });

      });

      promise.then(resolved => {
          this.dialogRef = this.dialog.open(DialogEditProject, {
              width: '500px',
              data: {
                  projectName: this.getupdateinfo.projet.nomProjet,
                  begindate: new Date(this.getupdateinfo.projet.dateDebut),
                  endDate: new Date(this.getupdateinfo.projet.dateFin),
                  descreption: this.getupdateinfo.projet.descriptionProjet
              }
          });



          this.dialogRef.afterClosed().subscribe(result => {
              this.projectName = result.projectName;
              this.begindate = result.begindate;
              this.endDate = result.endDate;
              this.descreption = result.descreption;
              this.userstosubmitedit = []
              for (let i of result.users) {
                  this.userstosubmitedit.push(i.firstname)
              }

              this.token = ""
              this.token = 'Token ' + window.localStorage['jwtToken'];
              const httpOptions = {
                  headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'Authorization': this.token
                  })
              };

              var addData = {

                  nom_projet: this.projectName,
                  date_debut: this.begindate.toString(),
                  date_fin: this.endDate.toString(),
                  description_projet: this.descreption,
                  id_user: this.userstosubmitedit

              }
              var v1 = new Date(this.begindate).toJSON().slice(0, 19).replace('T', ' ')
              var v2 = new Date(this.endDate).toJSON().slice(0, 19).replace('T', ' ')
              var query = '/modifierprojet/'+this.projectid+'?nom_projet=' + this.projectName + '&date_debut=' + v1.toString() + '&date_fin=' + v2.toString() + '&description_projet=' + this.descreption ;

              alert(JSON.stringify(query, null, 4));

              this.http.post(environment.url + query,"", httpOptions).subscribe(res => {
                this.http.get(environment.url + '/projet/listeProjet').subscribe(res => {
                  this.projectresponse = res;
                  this.projects = this.projectresponse[0];
              });
              });

          });
      });
  }



//Ajout d'un projet
  openDialog(): void {
      let dialogRef = this.dialog.open(DialogAddProjet, {
          width: '500px',
          data: {
              projectName: '',
              begindate: '',
              endDate: '',
              descreption: '',
              users: ''
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          this.projectName = result.projectName;
          this.begindate = result.begindate;
          this.endDate = result.endDate;
          this.descreption = result.descreption;
          this.userstosubmit = []

          for (let i of result.users) {
              this.userstosubmit.push(i.id)
          }


          this.token = ""
          this.token = window.localStorage['jwtToken'];
          const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': this.token
              })
          };

       /*   var addData = {

              nom_projet: this.projectName,
              date_debut: "1212-12-12", //this.begindate.toString(), 
              date_fin: "4646-45--65", //this.endDate.toString(),
              description_projet: this.descreption,
              id_user: this.userstosubmit
          }*/
          var v1 = new Date(this.begindate).toJSON().slice(0, 19).replace('T', ' ')
          var v2 = new Date(this.endDate).toJSON().slice(0, 19).replace('T', ' ')
          var query = '/projet/addproject?nom_projet=' + this.projectName + '&description_projet=' + this.descreption +'&date_debut=' + v1.toString() + '&date_fin=' + v2.toString() + '&id_user=' + this.userstosubmit;
                this.http.post(environment.url + query, httpOptions).subscribe(res => {
                this.http.get(environment.url + '/projet/listeProjet').subscribe(res => {
                this.projectresponse = res;
                this.projects = this.projectresponse[0];

              });
          });

      });

  }




  ngOnInit() {
      this.user = jwt_decode(window.localStorage['jwtToken']);
      //alert(JSON.stringify(this.token,null,4));
      /*const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.token })};*/
      this.http.get(environment.url + '/projet/listeProjet').subscribe(res => {
          this.projectresponse = res;
          this.projects = this.projectresponse[0];

      });

  }
}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addProjetDialogue.html',
  styleUrls: ['./projets.component.css']
})
export class DialogAddProjet implements OnInit {
  userrespense: any;


  constructor(
      private http: HttpClient,
      public dialogRef: MatDialogRef < DialogAddProjet > ,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
      this.dialogRef.close();
  }
  userControl = new FormControl();
  public token: any;
  public users = [];
  selectedUsers: User[] = new Array < User > ();

  filteredUsers: Observable < User[] > ;
  lastFilter: string = '';

  ngOnInit() {

      this.token = ""
      this.token = window.localStorage['jwtToken'];
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.token
          })
      };
      let promise = new Promise((resolve, reject) => {
          this.http.get(environment.url + '/user/getall').subscribe(res => {
              resolve(this.userrespense = res);
          });
      });

      promise.then(resolved => {
          for (let i of this.userrespense) {
              this.users.push(new User(i.nom, i.id));
          }
          // alert(JSON.stringify(this.userrespense,null,4))
          this.filteredUsers = this.userControl.valueChanges.pipe(
              startWith < string | User[] > (''),
              map(value => typeof value === 'string' ? value : this.lastFilter),
              map(filter => this.filter(filter))
          );
      });
  }

  filter(filter: string): User[] {
      this.lastFilter = filter;
      if (filter) {
          return this.users.filter(option => {
              return option.firstname.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
                  option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
          })
      } else {
          return this.users.slice();
      }
  }

  displayFn(value: User[] | string): string | undefined {
      let displayValue: string;
      if (Array.isArray(value)) {
          value.forEach((user, index) => {
              if (index === 0) {
                  displayValue = user.firstname + ' ' + user.lastname;
              } else {
                  displayValue += ', ' + user.firstname + ' ' + user.lastname;
              }
          });
      } else {
          displayValue = value;
      }
      return displayValue;
  }

  optionClicked(event: Event, user: User) {
      event.stopPropagation();
      this.toggleSelection(user);
  }

  toggleSelection(user: User) {
      user.selected = !user.selected;
      if (user.selected) {
          this.selectedUsers.push(user);
      } else {
          const i = this.selectedUsers.findIndex(value => value.firstname === user.firstname && value.lastname === user.lastname );
          this.selectedUsers.splice(i, 1);
      }

      this.userControl.setValue(this.selectedUsers);
  }

}




export class User {
    lastname: string;
  constructor(public firstname: string, public id: string, public selected ? : boolean) {
      if (selected === undefined) selected = false;
  }
}
/*
export class MultiselectAutocompleteExample implements OnInit {

}

*/




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'EditProjectDialogue.html',
  styleUrls: ['./projets.component.css']
})
export class DialogEditProject {
  token: string;
  userrespense: any;


  constructor(
      private http: HttpClient,
      public dialogRef: MatDialogRef < DialogEditProject > ,

      @Inject(MAT_DIALOG_DATA) public data: any) {}



  userControl = new FormControl();
  public users = [];
  selectedUsers: User[] = new Array < User > ();
  filteredUsers: Observable < User[] > ;
  lastFilter: string = '';


  onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit() {

      this.token = ""
      this.token = 'Token ' + window.localStorage['jwtToken'];
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.token
          })
      };
      let promise = new Promise((resolve, reject) => {
          this.http.get(environment.url + '/user/getall').subscribe(res => {
              resolve(this.userrespense = res);
          });
      });

      promise.then(resolved => {
          for (let i of this.userrespense) {
              this.users.push(new User(i.nom, i.id, i.surnom));
          }
          // alert(JSON.stringify(this.userrespense,null,4))
          this.filteredUsers = this.userControl.valueChanges.pipe(
              startWith < string | User[] > (''),
              map(value => typeof value === 'string' ? value : this.lastFilter),
              map(filter => this.filter(filter))
          );
      });
  }




  filter(filter: string): User[] {
      this.lastFilter = filter;
      if (filter) {
          return this.users.filter(option => {
              return option.firstname.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
                  option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
          })
      } else {
          return this.users.slice();
      }
  }

  displayFn(value: User[] | string): string | undefined {
      let displayValue: string;
      if (Array.isArray(value)) {
          value.forEach((user, index) => {
              if (index === 0) {
                  displayValue = user.firstname + ' ' + user.lastname;
              } else {
                  displayValue += ', ' + user.firstname + ' ' + user.lastname;
              }
          });
      } else {
          displayValue = value;
      }
      return displayValue;
  }

  optionClicked(event: Event, user: User) {
      event.stopPropagation();
      this.toggleSelection(user);
  }

  toggleSelection(user: User) {
      user.selected = !user.selected;
      if (user.selected) {
          this.selectedUsers.push(user);
      } else {
          const i = this.selectedUsers.findIndex(value => value.firstname === user.firstname && value.lastname === user.lastname );
          this.selectedUsers.splice(i, 1);
      }

      this.userControl.setValue(this.selectedUsers);
  }


}