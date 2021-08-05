import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Prompt} from './my-modal';

let httpClient = new HttpClient();

@inject(DialogService)
export class App {
  listItems: any[];
  loading: boolean;
  editMode: { 1: boolean; 2: boolean; 3: boolean; };
  dialogService: any;
  constructor(dialogService) {
    this.listItems = [{title: "----------------------", completed:"----"},{title: "----------------------", completed:"----"},{title: "----------------------", completed:"----"}];
    this.loading=false;
    this.editMode={ 1: true, 2: true, 3: true }
    this.dialogService = dialogService;
  }

  created() {
    this.getData()
  }

  handleModeChange(id:number){
    console.log(id, this.editMode[id])
    this.editMode[id]=!this.editMode[id];
  }
  getData() {
    this.loading=true
    httpClient.fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
       console.log(data.length)
       this.listItems=data
       this.loading=false
       data.map((item: { id: number; })=>this.editMode[item.id]=true);
    });
  }

  openModal() {
    console.log("abriendo modal")
    this.dialogService.open( {viewModel: Prompt, model: 'Are you sure?' }).then((response: { wasCancelled: any; output: any; }) => {
       console.log(response);
    
       if (!response.wasCancelled) {
          console.log('OK');
       } else {
          console.log('cancelled');
       }
       console.log(response.output);
    });
 }


}
