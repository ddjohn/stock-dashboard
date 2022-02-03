console.log('StockAPI', 'StockAPI');

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { StockMethods, stocks } from '/server/StockMethods';

Future = Npm.require("fibers/future");

const stockMethods = new StockMethods();

Meteor.methods({

  'stock.graph': function(stockName) {
    console.log('StockAPI', 'stock.graph');
    check(stockName, String);

    var future = new Future();
    stockMethods.graph(stockName).then(resp => {
      future.return(resp);
    });
    
    return future.wait();
  },
});

