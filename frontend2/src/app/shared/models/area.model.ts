export class Area {
   id!: number;
   Name!: string;
   Description!: string;
   constructor(...args: Partial<Area>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<Area> = {
   Name: '',
   Description: ''
};
