import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AreasComponent } from './areas/areas.component';
import { StatesComponent } from './states/states.component';
import { TypesComponent } from './types/types.component';
import { ProductsComponent } from './products/products.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
   declarations: [UsersComponent, AreasComponent, StatesComponent, TypesComponent, ProductsComponent],
   imports: [CommonModule, CoreRoutingModule, SharedModule],
   providers: [],
})
export class CoreModule {}
