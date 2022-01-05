console.log('StockCollection', 'StockCollection');

import { Mongo } from 'meteor/mongo';
 
export const StockCollection = new Mongo.Collection('stocks');
