import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Subscription } from 'rxjs';

import { UsersService } from '../services/users.services';

import * as fromModels from 'src/app/shared/models';

@Component({
   selector: 'app-users',
   templateUrl: './users.component.html',
   styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
   serviceComponent: string = 'user';
   modelTable!: fromModels.ModelTable;
   userForm!: FormGroup;
   userUpdate: boolean = false;

   constructor(private usersServices: UsersService) {}

   ngOnInit(): void {
      this.loadForm();
      this.loadTable();
      this.loadInfo();
   }
   loadForm(data?: fromModels.User) {
      this.userForm = new FormGroup({
         id: new FormControl(data?.id),
         Name: new FormControl(data?.Name, Validators.required),
         Email: new FormControl(data?.Email, [Validators.required, Validators.email]),
         Password: new FormControl(data?.Password, Validators.required),
      });
   }
   loadTable(data?: Array<any>) {
      this.modelTable = new fromModels.ModelTable({
         columns: ['Id', 'Nombre', 'Correo electronico', 'Contraseña'],
         rows: data,
      });
   }
   async loadInfo() {
      const service$ = this.usersServices.getAll(this.serviceComponent);
      await lastValueFrom(service$)
         .then((response) => {
            this.loadTable(response);
         })
         .catch(console.error);
   }
   async onSubmit() {
      if (this.userForm.valid) {
         const user: fromModels.User = this.userForm.value;

         if (this.userUpdate) {
            const service$ = this.usersServices.update(user, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Actualizacion exitosa') {
                     this.loadInfo();
                     this.userUpdate = false;
                     this.userForm.reset();
                  }
               })
               .catch(console.error);
         } else {
            const service$ = this.usersServices.post(user, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Creacion exitosa') {
                     this.userForm.reset();
                     this.loadInfo();
                  }
               })
               .catch(console.error);
         }
      }
   }
   async receiveEvent({ action, data }: fromModels.dataEmitter) {
      if (action === 'edit') {
         this.userUpdate = true;
         this.loadForm(data);
      } else {
         const service$ = this.usersServices.remove(data.id, this.serviceComponent);
         await lastValueFrom(service$)
            .then((response) => {
               if (response === 'Eliminacion exitosa') {
                  this.loadInfo();
               }
            })
            .catch(console.error);
      }
   }
   cancelForm = () => this.userForm.reset();
}
