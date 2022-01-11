export class State {
   id!: number;
   Name!: string;
   Description!: string;
   constructor(...args: Partial<State>[]) {
      Object.assign(this, InitialTable, ...args);
   }
}
const InitialTable: Partial<State> = {
   Name: '',
   Description: ''
};
