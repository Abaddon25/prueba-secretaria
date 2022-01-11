export class ModelTable {
   columns!: Array<string>;
   rows!: Array<any>;
   constructor(...args: Partial<ModelTable>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<ModelTable> = {
   columns: [],
   rows: [],
};
