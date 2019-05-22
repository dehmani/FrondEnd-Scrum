import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@Component({
  selector: 'app-detaille-projet',
  templateUrl: './detaille-projet.component.html',
  styleUrls: ['./detaille-projet.component.css']
})
export class DetailleProjetComponent implements OnInit {

  public hideclosed=false;
  public projectid;
  public token: string ;
  public data: any ;
  public projectresponse: any ;
  private epic: any;
  private projectdescription: any;
  private projectTitle: any;
  private affectedMembers: any;
  private elapsedTime: any;
  listeepics: any;
  epictName: any;
  constructor( private route: ActivatedRoute ,public dialog: MatDialog ,private http: HttpClient) { }
  public projects = [] ;
  public projectName ;
  public begindate;
  public endDate ;
  public descreption ;
  public user: any;
  public Epic = [];
  public EpicName;
  public membersresponse ;
  public mebersnames = [] ;
  getupdateinfo: any;
  dialogRef: MatDialogRef<DialogAddEpic, any>;
  dialogRef2: MatDialogRef<DialogEditEpic, any>;

  

//Delete Epic
  deleteepic(epicTodelete) {
    this.token = ""
    this.token = window.localStorage['jwtToken'];
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token
        })
    };
    this.http.post(environment.url + '/deleteepic/' + epicTodelete, httpOptions).subscribe(res => {
        alert("Epic deleted with success")
        this.http.get(environment.url+'/afficheEpicall/'+this.projectid, httpOptions).subscribe(res => {
            this.listeepics = res[0] ;
            
        });
    });
}




//Edit Epic

  openDialogEdit(idepic): void {
    let dialogRef2 = this.dialog.open(DialogEditEpic, {
      width: '500px',
      data: { EpicName : '' ,  descreption : '' }
    });
    dialogRef2.afterClosed().subscribe(result => {
      this.EpicName = result.EpicName ; 
      this.descreption = result.descreption ;
      
     this.token = ""
     this.token =  window.localStorage['jwtToken'];
     const httpOptions = {
         headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'Authorization': this.token
         })
     };
       
   var addData = {
  
       EpicName : this.EpicName ,
       descreption : this.descreption,
       }
      this.http.post(environment.url+'/modifierepic/'+idepic+'?nom_epic='+this.EpicName+'&description_epic='+this.descreption+'&token='+this.token,"", httpOptions).subscribe(res => {
      this.http.get(environment.url+'/afficheEpicall/'+this.projectid, httpOptions).subscribe(res =>{
            this.listeepics = res[0] ;
           });
        
     });
  
    });
  }


















//Add Epic

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddEpic, {
      width: '500px',
      data: { EpicName : '' ,  descreption : '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.EpicName = result.projectName ; 
      this.descreption = result.descreption ;
      
   


     this.token = ""
     this.token =  window.localStorage['jwtToken'];
     const httpOptions = {
         headers: new HttpHeaders({
             'Content-Type': 'application/json',
             'Authorization': this.token
         })
     };

   var addData = {

        nom_epic : this.EpicName ,
        description_epic : this.descreption,
        id_projet : this.projectid
       }
       var quey="?nom_epic="+this.EpicName+"&description_epic="+this.descreption+"&id_projet="+this.projectid+"&token="+this.token
      this.http.post(environment.url+'/ajoutepic'+quey,"", httpOptions).subscribe(res => {
      this.http.get(environment.url+'/afficheEpicall/'+this.projectid, httpOptions).subscribe(res =>{
              this.listeepics = res[0] ;
             });
    });

    });

  }












  ngOnInit() {
    
    
    this.route.params.subscribe(params => {
    if (params['id']) {
      this.projectid = params['id'];
    }
  });

  this.token = '';
  this.token = 'Token ' + window.localStorage['jwtToken'];
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.token })};


   this.http.get(environment.url+'/afficheEpicall/'+this.projectid, httpOptions).subscribe(res =>{

    this.listeepics = res[0] ;
   });


  let promise = new Promise( (resolve , reject)=>{
  this.http.get(environment.url+'/afficheprojet/'+this.projectid, httpOptions).subscribe(res =>
  {
  this.projectresponse = res ;
    this.elapsedTime = Math.round((Date.now()- +(new Date(this.projectresponse.projet.dateDebut)))*(2.7778e-7) *10 ) / 10 ;
    this.affectedMembers = this.projectresponse.projet.user.nom ;
    this.projectTitle = this.projectresponse.projet.nomProjet ;
    this.projectdescription = this.projectresponse.projet.descriptionProjet;
    //console.log(JSON.stringify(this.projectresponse,null,4))

    resolve();
  });
  });
  promise.then(resolved =>  {

/*
    let promise2 = new Promise( (resolve , reject)=>{

    for(let memberid of this.affectedMembers){
      this.http.get(environment.url+'/user/getall'+memberid,httpOptions).subscribe(res=>{
      this.membersresponse = res ;
      this.mebersnames.push({name :this.membersresponse.username   , id : this.membersresponse.id }) ;
      
      }); 
    }
    resolve();
  });
    */
  
  
  
});

  }

}











/*Classe Add Epic*/

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addEpicDialogue.html',
  styleUrls: ['./detaille-projet.component.css']
})
export class DialogAddEpic implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogAddEpic>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}



/*Classe Edit Epic*/
@Component({
  selector: 'dialog-overview-edit-dialog',
  templateUrl: 'EditEpicDialogue.html',
  styleUrls: ['./detaille-projet.component.css']
})
export class DialogEditEpic implements OnInit {


  constructor(
    public dialogRef2: MatDialogRef<DialogEditEpic>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef2.close();
  }


  ngOnInit() {
   }
}