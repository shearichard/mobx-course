import {/*action,*/ autorun, observable, runInAction} from "mobx";

class Person {
    @observable
    firstName: string;
    //
    constructor(name: string){
        this.firstName = name;
    }
    //
    //@action 
    //updateFirstName(name: string){
    //    this.firstName = name;
    //}
}
//
const newPerson = new Person('Georgy Gleazer');
//This is for logging
autorun(() => {
    console.log(`Person name is : ${newPerson.firstName}`);
});
//
runInAction(() => {
    newPerson.firstName = 'Fred';
});
//
//newPerson.updateFirstName('Fred');
//
export {};
