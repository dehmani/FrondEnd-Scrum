import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {environment}from '../../environments/environment'
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-detaille-epic',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detaille-epic.component.html',
  template: `
<div *ngIf="loaded | async " >
  <tree-diagram [data]="tree"></tree-diagram>
</div>
  `})
export class DetailleEpicComponent implements OnInit {
  token: any;
  public projectid: any;
  public listeepic: any;
  public tree: any;
  loaded: Promise<boolean>;
  listeus: any;
  currentproject: any;

  constructor(private route: ActivatedRoute ,public dialog: MatDialog ,private http: HttpClient) { }

public treeConfig = {
    nodeWidth: 150,
    nodeHeight: 100,
    
};


ngOnInit() {

  this.route.params.subscribe(params => {
    if (params['id']) {
      this.projectid = params['id'];
    }
  });


  this.token = ""
  this.token = 'Token ' + window.localStorage['jwtToken'];
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
      })
  };
  

  this.tree = {json :[{"guid": "project-"+this.projectid , "displayName" : "init" , "children" : [] }] , config: this.treeConfig }

  let promise = new Promise( (resolve , reject)=>{







  this.http.get(environment.url +'/afficheEpicall/'+this.projectid, httpOptions).subscribe(res => {
    this.listeepic = res[0];
    this.tree.json[0].displayName = this.listeepic[0].rojet.nomProjet
    for(let theepic of this.listeepic){
    this.tree.json[0].children.push("epic-"+theepic.id)
    this.tree.json.push({"guid": "epic-"+theepic.id , "displayName" : theepic.nomEpic , "children" : [] , "parentId": "project-"+this.projectid})
  }
   resolve();
  });

}).then(resolved =>{





for(let i=0 ; i < this.tree.json[0].children.length ; i++)
{
    this.http.get(environment.url +'/afficheustoryAll/'+this.tree.json[0].children[i].split('-')[1], httpOptions).subscribe(res => {
      this.listeus = res[0]
      for(let theus of this.listeus){
      this.tree.json[(i+1)].children.push("us-"+theus.id)
      this.tree.json.push({"guid": "us-"+theus.id , "displayName" : theus.nomSerStory , "children" : [] , "parentId": this.tree.json[0].children[i]})   
      }
    });

}

return 0 ;

}).then(resolved =>  {

  setTimeout(() => 
  
  this.loaded = Promise.resolve(true)

  , 2000);

});


}

}
