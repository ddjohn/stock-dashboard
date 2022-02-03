import { IotCollection } from "../imports/api/IotCollection";

console.log('IotMethods', 'IotMethods');

export class IotMethods {
    constructor() {}

    async graph(stock) {
        return IotCollection.find().fetch();
    }
}
