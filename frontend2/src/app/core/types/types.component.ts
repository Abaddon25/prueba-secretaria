import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TypesService } from '../services/types.services';

import * as fromModels from 'src/app/shared/models';

@Component({
   selector: 'app-types',
   templateUrl: './types.component.html',
   styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
   serviceComponent: string = 'type';
   modelTable!: fromModels.ModelTable;
   typeForm!: FormGroup;
   typeUpdate: boolean = false;

   constructor(private typesServices: TypesService) {}

   ngOnInit(): void {
      this.loadForm();
      this.loadTable();
      this.loadInfo();
   }
   loadForm(data?: fromModels.Type) {
      this.typeForm = new FormGroup({
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
      const service$ = this.typesServices.getAll(this.serviceComponent);
      await lastValueFrom(service$)
         .then((response) => {
            this.loadTable(response);
         })
         .catch(console.error);
   }
   async onSubmit() {
      if (this.typeForm.valid) {
         const type: fromModels.Type = this.typeForm.value;

         if (this.typeUpdate) {
            const service$ = this.typesServices.update(type, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Actualizacion exitosa') {
                     this.loadInfo();
                     this.typeUpdate = false;
                     this.typeForm.reset();
                  }
               })
               .catch(console.error);
         } else {
            const service$ = this.typesServices.post(type, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Creacion exitosa') {
                     this.typeForm.reset();
                     this.loadInfo();
                  }
               })
               .catch(console.error);
         }
      }
   }
   async receiveEvent({ action, data }: fromModels.dataEmitter) {
      if (action === 'edit') {
         this.typeUpdate = true;
         this.loadForm(data);
      } else {
         const service$ = this.typesServices.remove(data.id, this.serviceComponent);
         await lastValueFrom(service$)
            .then((response) => {
               if (response === 'Eliminacion exitosa') {
                  this.loadInfo();
               }
            })
            .catch(console.error);
      }
   }
   cancelForm = () => this.typeForm.reset();
}
