console.log('IotAPI', 'IotAPI');

import { Meteor } from 'meteor/meteor';
import { IotCollection } from './IotCollection';
import { IotMethods } from '/server/IotMethods';

Future = Npm.require("fibers/future");

const iotMethods = new IotMethods();

Meteor.methods({
  
  'iot.graph': function() {
        console.log('IotAPI', 'iot.graph');
    
        var future = new Future();
        
        iotMethods.graph().then(resp => {
          future.return(resp);
        });
        return future.wait();
      },
    
    'iot.insert': function(temperature, humidity) {
        console.log('IotAPI', 'iot.insert1', temperature);
        IotCollection.insert({temperature:parseFloat(temperature), humidity:parseFloat(humidity), date:Date.now()});
        console.log('IotAPI', 'iot.insert2', humidity);
    } 
});