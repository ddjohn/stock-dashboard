console.log('IotCollection', 'IotCollection');

import { Mongo } from 'meteor/mongo';
 
export const IotCollection = new Mongo.Collection('iots');
