import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";
import {Prompt} from './components/modal';

let httpClient = new HttpClient();

@autoinject
export class App {
  listItems: any[];
  loading: boolean;
  editMode: { 1: boolean; 2: boolean; 3: boolean; };
  dialogService: DialogService;
  log:{videoGameId: number; name:String;description:String;categoryId:number;platformId:number;quantityAvailable:number;active:boolean;category:String;platform:String;};
  constructor(dialogService: DialogService) {
  this.listItems = [{videoGameId: "----------------------", name:"----------------------", description:"----------------------", categoryId:"----------------------", platformId:"----------------------", quantityAvailable:"----------------------", active:"----------------------", category:"----------------------", platform:"----------------------",}
,{videoGameId: "----------------------", name:"----------------------", description:"----------------------", categoryId:"----------------------", platformId:"----------------------", quantityAvailable:"----------------------", active:"----------------------", category:"----------------------", platform:"----------------------",},
{videoGameId: "----------------------", name:"----------------------", description:"----------------------", categoryId:"----------------------", platformId:"----------------------", quantityAvailable:"----------------------", active:"----------------------", category:"----------------------", platform:"----------------------",}];
    this.loading=false;
    this.editMode={ 1: true, 2: true, 3: true }
    this.dialogService = dialogService;
  }

  //primer parte del ciclo de vida
  created() {
    this.getData()
  }

  //editar o aplicar cambios 
  handleModeChange(id:number, item:any){
    console.log(id, this.editMode[id])
    
    if(this.editMode[id]){
      console.log("solo editar")
      this.editMode[id]=false;
    }
    else{
      console.log("item: ",item)
      this.openModal('¿Estás seguro de guardar los datos editados de esta fila?',1,item,id)
    }
  }

  // api rest get
  getData(context?:any) {
    if(!context){
      context=this
    }
    context.loading=true
    httpClient.fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
       console.log(data)
       context.listItems=data
       context.loading=false
       data.map((item: { id: number; })=>context.editMode[item.id]=true);
    });
  }

  // abrir dialogo
  openModal(_mensaje:String, _type:number,_item?:any,_id?:number) {
    console.log("abriendo modal")
    this.dialogService.open( {viewModel: Prompt, model: {type: _type,message:_mensaje, id:_id, context:this, item:_item} }).then((response: { wasCancelled: any; output: any; }) => {
       console.log(response);
    
       if (!response.wasCancelled) {
          console.log('OK');
       } else {
          console.log('cancelled');
       }
       console.log(response.output);
    });
 }

 //ejecutar seteo de estado boton aditar/cambiar
 public setEditMode(_id:number, _context:any, _item:any){
   console.log("corriendo", _id, _item)
   _context.editMode[_id]=true
   //put
 }

 setNewLog(){

   console.log("nuevo",this.log)
   if(this.log){
    if(this.log.videoGameId && this.log.name && this.log.description && this.log.categoryId && this.log.platformId && this.log.quantityAvailable && this.log.active && this.log.category && this.log.platform){
      //post
    }else{
      this.openModal('Debes colocar datos para continuar',0, )
    }
   }else{
    this.openModal('Debes colocar datos para continuar',0, )
   }
   
 }

 deleteLog(id:number, item:any){
  console.log("-----",id, item)
  this.openModal('¿Estás seguro de eliminar esta fila de datos?',2, item, id)
}

public setDeleteLog(_id:number, _context:any, _item:any){
  console.log("remover",_id,_item)
  //delete
  _context.getData()
 }

 


}
