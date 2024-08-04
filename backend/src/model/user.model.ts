export class User {

    name: string;

    password: string;

    activation: number;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.activation = 0;
    }

    public getName() {
        return this.name;
    }
}