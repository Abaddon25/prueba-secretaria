export class User {
   id!: number;
   Name!: string;
   Email!: string;
   Password!: string;
   constructor(...args: Partial<User>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<User> = {
   Name: '',
   Email: '',
   Password: '',
};
