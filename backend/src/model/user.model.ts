import {Activation} from './activation.model'

export class User {

    name: string;

    password: string;

    activation: Activation[];

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.activation = [];
    }

    public getName() {
        return this.name;
    }
}