console.log('TurfMethods', 'TurfMethods');

import got from 'got';
import { TurfLocationCollection } from '/imports/api/TurfLocationCollection';

const api = "http://api.turfgame.com/v4/";

export class TurfMethods {
    constructor() {}

    async getUsers() {
        try {      
            const result = await got.get(api + 'users/location', {});
            const json = JSON.parse(result.body);
            return json;
        }
        catch (error) {
            console.log('error', error);
            return null;
        }
    }

    main() {
        setInterval(() =>
            this.getUsers().then((json) => {
                console.log(".");
                TurfLocationCollection.insert({date: Date.now(), json: json})
            }
        ), 2000);
    }
}
