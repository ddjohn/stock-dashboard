console.log('IotAPI', 'IotAPI');

import { Meteor } from 'meteor/meteor';
import { IotCollection } from './IotCollection';

Meteor.methods({
    'iot.insert': function(temperature, humidity) {
        console.log('IotAPI', 'iot.insert1', temperature);
        IotCollection.insert({temperature:parseFloat(temperature), humidity:parseFloat(humidity), date:Date.now()});
        console.log('IotAPI', 'iot.insert2', humidity);
    }
});