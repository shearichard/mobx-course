import {action, autorun, observable , runInAction, when, reaction } from "mobx";


class Person {
    @observable
    firstName: string;
    @observable
    lastName: string;
    @observable
    age: number = 15;
    @observable
    isAlive: boolean = true;
    //
    constructor(props: Partial<Person>){
        Object.assign(this, props);

        when(
            // once ...
            () => this.age > 99,
            // ... then                
            () => this.bury(),
        )
    }
    @action
    bury() {
        this.isAlive = false;
    }
    @action 
    setAge(age: number){
       this.age = age;
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

const newPerson = new Person({firstName: 'Fred', lastName: 'Smith'});

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
    console.log(`Person name is : ${newPerson.firstName} ${newPerson.lastName} (${newPerson.age}) ${newPerson.isAlive}`);
});
//
//
const disposer = reaction(
    //once ...
    () => newPerson.isAlive === false,
    //... then
    () => console.log("RIP")
);
//
runInAction(async () => {
    newPerson.firstName = 'Martha';
    newPerson.lastName = 'Jones';
});

newPerson.setAge(100);

//Note that having run once in response
//to setting the age to 100 the reaction
//does not run again as age is set to 90
//and then back to 100.
newPerson.setAge(90);
newPerson.setAge(100);

//The function returned from 'reaction'
//deactivate the reaction and returns
//the memory
disposer();

export {};
