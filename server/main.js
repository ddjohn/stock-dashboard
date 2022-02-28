console.log('main', 'main');

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { WebApp, WebAppInternals } from 'meteor/webapp'

import { StockMethods } from '/server/StockMethods';
import { IotMethods   } from '/server/IotMethods';
import { TurfMethods  } from '/server/TurfMethods';
import { IotCollection } from "../imports/api/IotCollection";

import '/imports/api/StockAPI';
import '/imports/api/IotAPI';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
    console.log('main', 'startup');

    WebApp.rawConnectHandlers.use('/data', function fooMiddleware(req, res, next) {
        const data = req.originalUrl.split("/");
        console.log('temperature', data[2].green);
        console.log('humidity', data[3].green);
        
        IotCollection.insert({
            temperature:parseFloat(data[2]), 
            humidity:parseFloat(data[3]), 
            date:Date.now()
        });

        console.log('done');

        // req.url starts with "/foo"
        next()
      })    

    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
          username: SEED_USERNAME,
          password: SEED_PASSWORD,
        });
    }

//    const iotMethods = new IotMethods();
 
    const stockMethods = new StockMethods();
    stockMethods.main();

    const turfMethods = new TurfMethods();
    turfMethods.main();    
});
