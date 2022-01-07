console.log('main', 'main');

import { Meteor } from 'meteor/meteor';

import { StockCollection } from '/imports/api/StockCollection';
import { StockMethods, stocks } from '/server/StockMethods';
import '/imports/api/StockAPI';

function percentage(current, base) {
    return (current-base)/base;
}

function ifExist(check, value) {
    if(check === undefined) {
        return null;
    } else {
        return check[value];
    }
}

function averageWithNull(arr) {


/*    var sum = 0.0;
    var max = 0.0;
    var min = 9999.0;
    var n = 0;
    arr.forEach(element => {
       if(element !== null) {
           sum += element;
           n++;

           if(element > max) {
               max = element;
           }

           if(element < min) {
               min = element;
           }
       } 
    });*/
    const mean = arr.reduce((s, n) => s + n) / arr.length;
    const variance = arr.reduce((s, n) => s + (n - mean) ** 2, 0) / (arr.length - 1);

    return {
        mean: mean,
        variance: variance,
        deviation: Math.sqrt(variance),
        max: arr.reduce((max, val) => max > val ? max : val),
        min: arr.reduce((min, val) => min < val ? min : val),
    }
}

Meteor.startup(() => {
    console.log('main', 'startup');

    const stockMethods = new StockMethods();

    stocks.forEach((stock) => {
        console.log('stock', stock);

        stockMethods.getTest(stock, 'chart').then((json) => {
            //console.log(JSON.stringify(json, null, 2));
            
            var temp20 = averageWithNull(json.indicators.quote[0].close.reverse().filter(i => i).slice(0, 20));
            var temp50 = averageWithNull(json.indicators.quote[0].close.reverse().filter(i => i).slice(0, 50));
            var temp200 = averageWithNull(json.indicators.quote[0].close.reverse().filter(i => i).slice(0, 200));

            StockCollection.update({'stock':stock}, 
            { 
                $set: {
                    // donchian
                    donchianLow:temp20.min,
                    donchianHigh:temp20.max,
                    
                    //averqge
                    average20:temp20.mean,
                    average50:temp50.mean,
                    average200:temp200.mean,
                    deviation :temp20.deviation,

                    time: Date.now()
                } 
            
            });    
        });

        stockMethods.getAll(stock).then((json) => {

            StockCollection.update({'stock':stock}, 
            { 
                $set: {
                    // summaryDetail
                    fiftyDay: json.summaryDetail.fiftyDayAverage.raw,
                    twoHundredDay: json.summaryDetail.twoHundredDayAverage.raw,
                    volumePct: percentage(json.summaryDetail.volume.raw, json.summaryDetail.averageVolume.raw),
                    pe: json.summaryDetail.trailingPE !== undefined ? json.summaryDetail.trailingPE.raw : 'NaN',
                    peg: json.defaultKeyStatistics !== undefined ? json.defaultKeyStatistics.pegRatio.raw : 'NaN',

                    // price
                    today: json.price.regularMarketChangePercent.raw,
                    short: json.price.shortName,

                    // assetProfile
                    sector: json.assetProfile ? json.assetProfile.sector : '',
                    industry: json.assetProfile ? json.assetProfile.industry : '',

                    // price
                    price: json.price.regularMarketPrice.raw,
                    open: json.price.regularMarketOpen.raw,
                    high: json.price.regularMarketDayHigh.raw,
                    low: json.price.regularMarketDayLow.raw,
                    volume: json.price.regularMarketVolume.raw,
                    

                    recommendations: json.recommendationTrend ? json.recommendationTrend.trend[1] : '',

                    time: Date.now()
                } 
            },
            {upsert: true}
            );  
        }, (err) => {
            console.log('error', error);
        });


    });
});
