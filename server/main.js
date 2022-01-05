console.log('main', 'main');

import { Meteor } from 'meteor/meteor';

import { StockCollection } from '/imports/api/StockCollection';
import { StockMethods, stocks } from '/server/StockMethods';

Meteor.startup(() => {
    console.log('main', 'startup');

    const stockMethods = new StockMethods();

    stockMethods.getTest('ERIC-B.ST', 'price').then((json) => {
        console.log(JSON.stringify(json, null, 2));
    });

    stocks.forEach((stock) => {
        console.log('stock', stock);
    
        stockMethods.getSummary(stock).then((json) => {
            console.log('=>', stock);
            StockCollection.update({'stock':stock}, 
            { 
                $set: {
                    fiftyDay: json.fiftyDayAverage.raw,
                    twoHundredDay: json.twoHundredDayAverage.raw,
                    volume: (json.volume.raw - json.averageVolume.raw)/json.averageVolume.raw,
                    pe: json.trailingPE.raw,
                    time: Date.now()
                } 
            },
            {upsert: true}
            );  
        });

        stockMethods.getPrice(stock).then((json) => {
            console.log('=>', stock);
            StockCollection.update({'stock':stock},
            { 
                $set: {
                    today: json.regularMarketChangePercent.raw,
                    short: json.shortName,
                    time: Date.now()
                } 
            },
            {upsert: true}
            );  
        });

        
    });
});
