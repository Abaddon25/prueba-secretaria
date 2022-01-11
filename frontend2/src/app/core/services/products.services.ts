import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.services';

@Injectable({
   providedIn: 'root',
})
export class ProductsService extends SharedService {
   constructor(http: HttpClient) {
      super(http);
   }
}
