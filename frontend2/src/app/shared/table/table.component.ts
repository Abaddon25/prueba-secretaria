import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromModels from '../models';

@Component({
   selector: 'app-table',
   templateUrl: './table.component.html',
   styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
   columns!: Array<string>;
   rows!: Array<any>;

   @Input()
   public set _modelTable(modelTable: fromModels.ModelTable) {
      this.columns = modelTable.columns;
      this.rows = modelTable.rows;
   }

   @Output() eventEmitter = new EventEmitter<fromModels.dataEmitter>();
   constructor() {}

   ngOnInit(): void {}
   returnKeys = (row: any) => Object.keys(row);
   emitterEvent = (action: string, data: any) => this.eventEmitter.emit({ action, data });
}
