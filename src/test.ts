import {action, autorun, observable , runInAction } from "mobx";

const waitForPromise = async () => new Promise(resolve => setTimeout(resolve, 1000));

class Person {
    @observable
    firstName: string;

    @observable
    lastName: string;
    //
    constructor(name: string, lastName: string){
        this.firstName = name;
        this.lastName = lastName;
    }
    
    @action 
    updateFirstName(name: string){
        this.firstName = name;
    }
    @action 
    updateLastName(name: string){
        this.lastName = name;
    }

    @action 
    updateFullName(name: string, lastName: string){
        this.firstName = name;
        this.lastName = lastName;
    }
}

const newPerson = new Person('Fred', 'Smith');

//This is for logging
autorun(() => {
    console.log(`Person name is : ${newPerson.firstName} ${newPerson.lastName}`);
});
//
runInAction(async () => {
    newPerson.firstName = 'Martha';
    //The effect of putting this call to `waitForPromise` is
    //for processing to sleep for one second . By doing this 
    //the change loop becomes visible in the console.  
    await waitForPromise();
    newPerson.lastName = 'Jones';
});

export {};
