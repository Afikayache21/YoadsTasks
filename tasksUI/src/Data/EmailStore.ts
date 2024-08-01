import { makeAutoObservable } from 'mobx';

class EmailStore {
    email: string = '';
  
    constructor() {
      makeAutoObservable(this);
    }

    setEmail( email: string) {
        this.email = email;
      }
}

 const emailStore = new EmailStore();
 export default emailStore