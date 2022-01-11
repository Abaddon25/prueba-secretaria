export class Product {
   id!: number;
   Name!: string;
   Description!: string;
   Serial!: string;
   Price!: number;
   Quantity!: number;
   Date!: Date;
   Type!: number;
   State!: number;
   Area!: number;
   User!: number;
   constructor(...args: Partial<Product>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<Product> = {
   Name: '',
   Description: '',
   Serial: '',
   Price: 0.0,
   Quantity: 0,
   Date: new Date(),
};
