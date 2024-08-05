export class Thread {

    private name: string;

    creator: string;

    constructor(name: string, creator: string) {
        this.name = name;
        this.creator = creator;
    }

    public getName() {
        return this.name;
    }
}