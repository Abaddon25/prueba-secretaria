import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AreasComponent } from './areas/areas.component';
import { StatesComponent } from './states/states.component';
import { TypesComponent } from './types/types.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
   { path: '', redirectTo: 'users', pathMatch: 'full' },
   { path: 'users', component: UsersComponent },
   { path: 'areas', component: AreasComponent },
   { path: 'states', component: StatesComponent },
   { path: 'types', component: TypesComponent },
   { path: 'products', component: ProductsComponent },
   { path: '**', redirectTo: 'users', pathMatch: 'full' }, 
];

@NgModule({
   imports: [CommonModule, RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class CoreRoutingModule {}
