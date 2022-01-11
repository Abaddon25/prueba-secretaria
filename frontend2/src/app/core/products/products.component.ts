import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, lastValueFrom } from 'rxjs';
import { ProductsService } from '../services/products.services';

import * as fromModels from 'src/app/shared/models';
import { twoControls } from 'src/app/shared/validators/two-controls.validators';

@Component({
   selector: 'app-products',
   templateUrl: './products.component.html',
   styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
   serviceComponent: string = 'product';
   modelTable!: fromModels.ModelTable;
   productForm!: FormGroup;
   productUpdate: boolean = false;
   types!: Array<fromModels.Type>;
   states!: Array<fromModels.State>;
   areas!: Array<fromModels.Area>;
   users!: Array<fromModels.User>;

   constructor(private productsServices: ProductsService) {}

   ngOnInit(): void {
      this.loadDepencies();
      this.loadForm();
      this.loadTable();
   }
   loadForm(data?: fromModels.Product) {
      this.productForm = new FormGroup(
         {
            id: new FormControl(data?.id),
            Name: new FormControl(data?.Name, Validators.required),
            Description: new FormControl(data?.Description, Validators.required),
            Serial: new FormControl(data?.Serial, Validators.required),
            Price: new FormControl(data?.Price, Validators.required),
            Quantity: new FormControl(data?.Quantity, Validators.required),
            Date: new FormControl({ value: data?.Date ?? this.returnDate(), disabled: true }),
            Type: new FormControl(data?.Type, Validators.required),
            State: new FormControl(data?.State, Validators.required),
            Area: new FormControl(data?.Area),
            User: new FormControl(data?.User),
         },
         { validators: twoControls('Area', 'User') }
      );
   }
   loadTable(data?: Array<fromModels.Product>) {
      this.modelTable = new fromModels.ModelTable({
         columns: ['Id', 'Nombre', 'Descripcion', 'Serial', 'Precio', 'Cantidad', 'Fecha', 'Tipo', 'Estado', 'Area', 'Usuario'],
         rows: data?.map((x) => {
            return {
               ...x,
               Area: this.areas?.find((y) => y.id === x.Area)?.Name,
               Type: this.types?.find((y) => y.id === x.Type)?.Name,
               State: this.states?.find((y) => y.id === x.State)?.Name,
               User: this.users?.find((y) => y.id === x.User)?.Name,
            };
         }),
      });
   }
   async loadDepencies() {
      const gets = {
         types: this.productsServices.getAll('type'),
         states: this.productsServices.getAll('state'),
         areas: this.productsServices.getAll('area'),
         users: this.productsServices.getAll('user'),
         products: this.productsServices.getAll(this.serviceComponent),
      };

      const serviceDepencies$ = forkJoin(gets);

      await lastValueFrom(serviceDepencies$)
         .then((response) => {
            this.types = response?.types;
            this.states = response?.states;
            this.areas = response?.areas;
            this.users = response?.users;
            this.loadTable(response?.products);
         })
         .catch(console.error);
   }
   async loadInfo() {
      const service$ = this.productsServices.getAll(this.serviceComponent);
      await lastValueFrom(service$)
         .then((response) => {
            this.loadTable(response);
         })
         .catch(console.error);
   }
   async onSubmit() {
      if (this.productForm.valid) {
         const product: fromModels.Product = this.productForm.getRawValue();
         const { Price } = product;
         product.Price = parseInt(Price.toString().replace('.', '').replace(',', ''));
         if (this.productUpdate) {
            const service$ = this.productsServices.update(product, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Actualizacion exitosa') {
                     this.loadInfo();
                     this.productUpdate = false;
                     this.productForm.reset();
                     this.loadForm();
                  }
               })
               .catch(console.error);
         } else {
            const service$ = this.productsServices.post(product, this.serviceComponent);
            await lastValueFrom(service$)
               .then((response) => {
                  if (response === 'Creacion exitosa') {
                     this.productForm.reset();
                     this.loadInfo();
                     this.loadForm();
                  }
               })
               .catch(console.error);
         }
      }
   }
   async receiveEvent({ action, data }: fromModels.dataEmitter) {
      if (action === 'edit') {
         this.productUpdate = true;
         this.loadForm({
            ...data,
            Area: this.areas.find((y) => y.Name === data.Area)?.id,
            Type: this.types.find((y) => y.Name === data.Type)?.id,
            State: this.states.find((y) => y.Name === data.State)?.id,
            User: this.users.find((y) => y.Name === data.User)?.id,
         });
      } else {
         const service$ = this.productsServices.remove(data.id, this.serviceComponent);
         await lastValueFrom(service$)
            .then((response) => {
               if (response === 'Eliminacion exitosa') {
                  this.loadInfo();
               }
            })
            .catch(console.error);
      }
   }
   cancelForm = () => this.productForm.reset();
   returnDate = () => {
      const dateFormat = new Date();
      return `${this.returnCero(dateFormat.getFullYear())}-${this.returnCero(dateFormat.getMonth() + 1)}-${this.returnCero(dateFormat.getDate())}`;
   };
   returnCero = (dato: number) => (dato <= 9 ? `0${dato}` : dato);
}
