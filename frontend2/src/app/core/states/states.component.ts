import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import * as fromModels from 'src/app/shared/models';
import { StatesService } from '../services/states.services';

@Component({
   selector: 'app-states',
   templateUrl: './states.component.html',
   styleUrls: ['./states.component.scss'],
})
export class StatesComponent implements OnInit {
   serviceComponent: string = 'state';
   modelTable!: fromModels.ModelTable;
   stateForm!: FormGroup;
   stateUpdate: boolean = false;

   constructor(private statesServices: StatesService) {}

   ngOnInit(): void {
      this.loadForm();
      this.loadTable();
      this.loadInfo();
   }
   loadForm(data?: fromModels.State) {
      this.stateForm = new FormGroup({
         id: new FormControl(data?.id),
         Name: new FormControl(data?.Name, Validators.required),
         Description: new FormControl(data?.Description, Validators.required),
      });
   }
   loadTable(data?: Array<any>) {
      this.modelTable = new fromModels.ModelTable({
         columns: ['Id', 'Nombre', 'Descripcion'],
         rows: data,
      });
   }
   async loadInfo() {
      const service$ = this.statesServices.getAll(this.serviceComponent);
      await lastValueFrom(service$)
         .then((response) => {
            this.loadTable(response);
         })
         .catch(console.error);
   }
   async onSubmit() {
      if (this.stateForm.valid) {
         const state: fromModels.State = this.stateForm.value;

         if (this.stateUpdate) {
            const service$ = this.statesServices.update(state, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Actualizacion exitosa') {
                     this.loadInfo();
                     this.stateUpdate = false;
                     this.stateForm.reset();
                  }
               })
               .catch(console.error);
         } else {
            const service$ = this.statesServices.post(state, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Creacion exitosa') {
                     this.stateForm.reset();
                     this.loadInfo();
                  }
               })
               .catch(console.error);
         }
      }
   }
   async receiveEvent({ action, data }: fromModels.dataEmitter) {
      if (action === 'edit') {
         this.stateUpdate = true;
         this.loadForm(data);
      } else {
         const service$ = this.statesServices.remove(data.id, this.serviceComponent);
         await lastValueFrom(service$)
            .then((response) => {
               if (response === 'Eliminacion exitosa') {
                  this.loadInfo();
               }
            })
            .catch(console.error);
      }
   }
   cancelForm = () => this.stateForm.reset();
}
