import {action, autorun, observable /*, runInAction */} from "mobx";

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

//const newPerson = new Person(name: 'Georgy', lastName: 'Gleazer');
const newPerson = new Person('Fred', 'Smith');

//This is for logging
autorun(() => {
    console.log(`Person name is : ${newPerson.firstName} ${newPerson.lastName}`);
});
//
newPerson.updateFullName('Martha', 'Jones');

export {};
