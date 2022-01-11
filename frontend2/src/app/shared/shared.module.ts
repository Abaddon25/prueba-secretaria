import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialsModule } from './materials/materials.module';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { httpInterceptorProviders } from './interceptors/interceptors';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [NavbarComponent, TableComponent, SpinnerComponent],
   imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule, FormsModule, MaterialsModule],
   exports: [NavbarComponent, TableComponent, ReactiveFormsModule, FormsModule],
   providers: [httpInterceptorProviders],
})
export class SharedModule {}
