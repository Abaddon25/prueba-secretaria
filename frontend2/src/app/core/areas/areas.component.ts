import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { AreasService } from '../services/areas.services';

import * as fromModels from 'src/app/shared/models';

@Component({
   selector: 'app-areas',
   templateUrl: './areas.component.html',
   styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
   serviceComponent: string = 'area';
   modelTable!: fromModels.ModelTable;
   areaForm!: FormGroup;
   areaUpdate: boolean = false;

   constructor(private areasServices: AreasService) {}

   ngOnInit(): void {
      this.loadForm();
      this.loadTable();
      this.loadInfo();
   }
   loadForm(data?: fromModels.Area) {
      this.areaForm = new FormGroup({
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
      const service$ = this.areasServices.getAll(this.serviceComponent);
      await lastValueFrom(service$)
         .then((response) => {
            this.loadTable(response);
         })
         .catch(console.error);
   }
   async onSubmit() {
      if (this.areaForm.valid) {
         const area: fromModels.Area = this.areaForm.value;

         if (this.areaUpdate) {
            const service$ = this.areasServices.update(area, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Actualizacion exitosa') {
                     this.loadInfo();
                     this.areaUpdate = false;
                     this.areaForm.reset();
                  }
               })
               .catch(console.error);
         } else {
            const service$ = this.areasServices.post(area, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Creacion exitosa') {
                     this.areaForm.reset();
                     this.loadInfo();
                  }
               })
               .catch(console.error);
         }
      }
   }
   async receiveEvent({ action, data }: fromModels.dataEmitter) {
      if (action === 'edit') {
         this.areaUpdate = true;
         this.loadForm(data);
      } else {
         const service$ = this.areasServices.remove(data.id, this.serviceComponent);
         await lastValueFrom(service$)
            .then((response) => {
               if (response === 'Eliminacion exitosa') {
                  this.loadInfo();
               }
            })
            .catch(console.error);
      }
   }
   cancelForm = () => this.areaForm.reset();
}
