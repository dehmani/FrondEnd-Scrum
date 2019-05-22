import { Component, OnInit, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { resolve } from 'url';
import {MatSnackBar} from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detaille-user-story',
  templateUrl: './detaille-user-story.component.html',
  styleUrls: ['./detaille-user-story.component.css']
})


export class DetailleUserStoryComponent implements OnInit {
private UserStoryName ;
private Descreption;
private Statut;
private Priorite;
private BusinessValue;
private PointDeComplexite;
public token: string;
public epicid: any;
public epicdescription: any;
public epicresponse: any;
public epicTitle: any;
public data : any ; 
public change: any;
public allusesponse: any;
public projectid;


  new = [
 
    
  ];
  todo=[
    
  ];
  ongoing=[
   
  ];

  done = [
    
  ];
  userstoryid: string;
  usid: any;
  dialogRef: MatDialogRef<DialogEditUserStory, any>;
  getupdateinfo: any;



  drop(event: CdkDragDrop<string[]>,state)
  {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else
    {
      this.change =event.previousContainer.data[event.previousIndex];
      this.data = {UserStoryId : this.change.id , state : state } ;
      this.token =  window.localStorage['jwtToken'];
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token }
        )};
    let promise = new Promise( (resolve , reject)=>
    { 
      this.http.post(environment.url+'/modifierstatut/'+this.change.id+'?statut='+state, httpOptions).subscribe(res =>
      {
        this.epicresponse = res ;
        this.epicTitle = this.epicresponse.name ;
        this.epicdescription = this.epicresponse.description;
        resolve(this.change);



        this.http.get(environment.url+'/afficheEpic/'+this.epicid, httpOptions).subscribe(res =>
          {
            this.epicresponse = res[0] ;          
            this.epicTitle = this.epicresponse.nomEpic ;
            this.epicdescription = this.epicresponse.descriptionEpic;
          
          });








      });
      });
      promise.then(resolve=>{
        this.snackBar.open(this.change.nomSerStory+" changed to "+state,"close", {
          duration: 3000,
        });});
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
}    
}


constructor(private snackBar: MatSnackBar , public dialog: MatDialog , private http: HttpClient ,private route: ActivatedRoute ) { }

  ngOnInit() {

this.route.params.subscribe(params => {
  if (params['id']) {
    this.epicid = params['id'];
  }
});

this.token = '';
this.token =  window.localStorage['jwtToken'];
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.token })};

this.http.get(environment.url+'/afficheEpic/'+this.epicid, httpOptions).subscribe(res =>
{
  this.epicresponse = res[0] ;
  this.epicTitle = this.epicresponse.nomEpic ;
  this.epicdescription = this.epicresponse.descriptionEpic;

});


this.http.get(environment.url+'/afficheustoryAll/'+this.epicid, httpOptions).subscribe(res =>
{
  this.allusesponse = res ;
  for(let UserStory of this.allusesponse[0])
  {
    switch(UserStory.statut){
      case 'new' :{
        this.new.push(UserStory);
        break;
      }
      case 'todo':{
        this.todo.push(UserStory);
        break;
      }
      case 'ongoing':{-
        this.ongoing.push(UserStory);
        break;
      }
      case 'done':{
        this.done.push(UserStory);      
        break;
      }

    }

  }

});

  }






//deleteUserStory(id){alert("delete "+id)}
//viewUserStory(id){alert("view "+id)}
//editUserStory(id){alert("edit "+id)}



/*Delete User Sory*/
deleteUS(UserStoryId) {
  this.token = ""
  this.token = window.localStorage['jwtToken'];
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
      })
  };
  this.http.post(environment.url + '/deleteustory/' + UserStoryId, httpOptions).subscribe(res => {
      alert("User Story deleted with success")

  });
}





















/*Ajout User Story*/

openDialog2(): void {
  let dialogRef = this.dialog.open(DialogAddUserStory, {
    width: '500px',
    data: { UserStoryName : '' ,  Descreption : '', Statut:'', Priorite:'', UserStoryBV:'', PointDeComplexite:''   }  });
  dialogRef.afterClosed().subscribe(result => {
    this.UserStoryName = result.UserStoryName ; 
    this.Descreption = result.Descreption ;
    this.Statut=result.Statut;
    this.Priorite=result.Priorite;
    this.BusinessValue=result.UserStoryBV;
    this.PointDeComplexite=result.PointDeComplexite;

   this.token = ""
   this.token = window.localStorage['jwtToken'];
   const httpOptions = {
       headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': this.token
       })
   };

 var addData = {

     nom_ustory : this.UserStoryName ,
     desc_ustory : this.Descreption,
     statut:this.Statut,
     priorite:this.Priorite,
     bus_value:this.BusinessValue,
     pt_comp:this.PointDeComplexite,
     }
     
   var query ="?id_epic="+this.epicid+"&nom_ustory="+this.UserStoryName+"&desc_ustory="+this.Descreption+"&bus_value="+this.BusinessValue+"&pt_comp="+this.PointDeComplexite+"&statut="+this.Statut+"&priorite="+this.Priorite;
    this.http.post(environment.url+'/ajoutUserStory'+query, httpOptions).subscribe(res => {
      this.http.get(environment.url+'/afficheustoryAll/'+this.epicid, httpOptions).subscribe(res =>
        {
          this.allusesponse = res ;
          this.new=[];
          this.todo=[];
          this.ongoing=[];
          this.done=[];
          for(let UserStory of this.allusesponse[0])
          {
            switch(UserStory.statut){
              case 'new' :{
                this.new.push(UserStory);
                break;
              }
              case 'todo':{
                this.todo.push(UserStory);
                break;
              }
              case 'ongoing':{
                this.ongoing.push(UserStory);
                break;
              }
              case 'done':{
                this.done.push(UserStory);      
                break;
              }
        
            }
        
          }
        
        });

   });

   
  });

}






/*Edit user story dialogue */
openDialog3(userstoryid): void {
  this.usid = userstoryid;
  this.token = ""
  this.token =  window.localStorage['jwtToken'];
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
      })
  };

  let promise = new Promise((resolve, reject) => {
      this.http.get(environment.url + '/afficheustory/' + this.usid, httpOptions).subscribe(res => {
          this.getupdateinfo = res
         // console.log(JSON.stringify(this.getupdateinfo,null,4))
          resolve(this.getupdateinfo)
      });

  });

  promise.then(resolved => {
      this.dialogRef = this.dialog.open(DialogEditUserStory, {
          width: '500px',
          
          data: {
              UserStoryName: this.getupdateinfo[0].nomSerStory,
              descreption: this.getupdateinfo[0].descriptionUserStory,
              statut:this.getupdateinfo[0].statut, 
              Priorite: this.getupdateinfo[0].priorite,
              BusinessValue: this.getupdateinfo[0].businessValue,
              PointDeComplexite:this.getupdateinfo[0].pointComp,
            }
            
      });

  this.dialogRef.afterClosed().subscribe(result => {
    this.UserStoryName = result.UserStoryName ; 
    this.Descreption = result.descreption ;
    this.Statut=result.statut;
    this.Priorite=result.Priorite;
    this.BusinessValue=result.BusinessValue;
    this.PointDeComplexite=result.PointDeComplexite;
    
 


   this.token = ""
   this.token = window.localStorage['jwtToken'];
   const httpOptions = {
       headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': this.token
       })
   };

 var addData = {

     UserStoryName : this.UserStoryName ,
     Descreption : this.Descreption,
     Statut:this.Statut,
     Priorite:this.Priorite,
     BusinessValue:this.BusinessValue,
     PointDeComplexite:this.PointDeComplexite,
     }
   var query ="?id_epic="+this.epicid+"&nom_ustory="+this.UserStoryName+"&desc_ustory="+this.Descreption+"&bus_value="+this.BusinessValue+"&pt_comp="+this.PointDeComplexite+"&statut="+this.Statut+"&priorite="+this.Priorite;
   this.http.post(environment.url+'/modifierustory/'+userstoryid+query, addData, httpOptions).subscribe(res => {
    this.http.get(environment.url+'/afficheustoryAll/'+this.epicid, httpOptions).subscribe(res =>
      {
        this.allusesponse = res ;
        this.new=[];
        this.todo=[];
        this.ongoing=[];
        this.done=[];
        for(let UserStory of this.allusesponse[0])
        {
          switch(UserStory.statut){
            case 'new' :{
              this.new.push(UserStory);
              break;
            }
            case 'todo':{
              this.todo.push(UserStory);
              break;
            }
            case 'ongoing':{
              this.ongoing.push(UserStory);
              break;
            }
            case 'done':{
              this.done.push(UserStory);      
              break;
            }
      
          }
      
        }
      
      });
  
  });

  });

});



}
}





@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'add-user-story.html',
  styleUrls: ['./detaille-user-story.component.css']
})
export class DialogAddUserStory implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogAddUserStory>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
   }
  
  
  
  
  }
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'edit-user-story.html',
    styleUrls: ['./detaille-user-story.component.css']
  })
  export class DialogEditUserStory implements OnInit {
  
  
    constructor(
      public dialogRef: MatDialogRef<DialogAddUserStory>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  
    ngOnInit() {
     }
    
    
    
    
    }