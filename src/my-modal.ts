import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class Prompt {
   controller: any;
   answer: any;
   message: any;
   constructor(controller: { settings: { centerHorizontalOnly: boolean; }; }) {
      this.controller = controller;
      this.answer = null;

      controller.settings.centerHorizontalOnly = true;
   }
   activate(message: any) {
      this.message = message;
   }
}
