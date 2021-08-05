import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
@inject(DialogController)

export class Prompt {
   controller: any;
   answer: any;
   message: any;
   idAux: number;
   typeAux:any;
   okFunction?: (id: number) => {};
   showButtons:boolean;
  context: any;
  itemAux: any;
   constructor(controller: { settings: { centerHorizontalOnly: boolean; }; }) {
      this.controller = controller;
      this.answer = null;
      this.showButtons=true;
      controller.settings.centerHorizontalOnly = true;
   }
   //recien se crea el dialog
   activate(model: any) {
      this.message = model.message;
      this.idAux=model.id;
      this.context=model.context;
      this.itemAux=model.item;
      this.typeAux=model.type
      console.log("activado", model.item)
      if(model.type==0){
        this.showButtons=false
      }
   }

   //pulsar el boton de cambiar
   confirm() : void {
     console.log("presionado ok", this.idAux, this.context, this.typeAux)
     switch(this.typeAux){
      case 1:
        this.context.setEditMode(this.idAux, this.context, this.itemAux);
        break;
      case 2:
        this.context.setDeleteLog(this.idAux, this.context, this.itemAux);
        break;
     }
    
    this.controller.ok();
}
}
