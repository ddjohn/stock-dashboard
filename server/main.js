console.log('main', 'main');

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { StockMethods } from '/server/StockMethods';
import { IotMethods   } from '/server/IotMethods';
import { TurfMethods  } from '/server/TurfMethods';

import '/imports/api/StockAPI';
import '/imports/api/IotAPI';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
    console.log('main', 'startup');

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
    //turfMethods.main();    
});
