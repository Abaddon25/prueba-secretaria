export class Type {
   id!: number;
   Name!: string;
   Description!: string;
   constructor(...args: Partial<Type>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<Type> = {
   Name: '',
   Description: ''
};
