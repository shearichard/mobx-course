import {action, autorun, observable , runInAction } from "mobx";


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

autorun(async () => {
    //-------------------------------------------------------------------------------
    //
    //From https://mobx.js.org/refguide/autorun.html
    //
    //mobx.autorun can be used in those cases where you want to create a reactive 
    //function that will never have observers itself. This is usually the case when 
    //you need to bridge from reactive to imperative code, for example for logging, 
    //persistence, or UI-updating code. When autorun is used, the provided function 
    //will always be triggered once immediately and then again each time one 
    //of its dependencies changes.
    //
    //-------------------------------------------------------------------------------
    //
    //This use of autorun illustrates how a reaction may be implemented using
    //autorun. The initial values of `newPerson` are seen in the log output, 
    //and, when the values of `newPerson` are updated the new values are seen
    //in the log output
    //
    console.log(`Person name is : ${newPerson.firstName} ${newPerson.lastName}`);
});
//
runInAction(async () => {
    newPerson.firstName = 'Martha';
    newPerson.lastName = 'Jones';
});

export {};
