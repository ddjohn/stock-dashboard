console.log('StockMethods', 'StockMethods');

import got from 'got';

export const stocks = []; 
export const stocks2 = ["%5EOMX", 
    "ABB.ST", "ALFA.ST", "ALIV-SDB.ST", "ASSA-B.ST", "ATCO-A.ST", 
  "ATCO-B.ST", "AZN.ST", "BOL.ST", "ELUX-B.ST", "ERIC-B.ST", 
  "ESSITY-B.ST", "EVO.ST", "GETI-B.ST", "HEXA-B.ST", "HM-B.ST", 
  "INVE-B.ST", "KINV-B.ST", "NDA-SE.ST", "SAND.ST", "SCA-B.ST", 
  "SEB-A.ST", "SHB-A.ST", "SINCH.ST", "SKA-B.ST", "SKF-B.ST", 
  "SWED-A.ST", "SWMA.ST", "TEL2-B.ST", "TELIA.ST", "VOLV-B.ST"];    

const web = 'https://query1.finance.yahoo.com/v10/finance/';

export class StockMethods {
    constructor() {}

    async getSummary(stock) {
        try {
          console.log('url', web + 'quoteSummary/' + stock + '?modules=summaryDetail');
      
          const result = await got.get(web + 'quoteSummary/' + stock + '?modules=summaryDetail', {});
          const json = JSON.parse(result.body);
          return json.quoteSummary.result[0].summaryDetail;
        }
        catch (error) {
          console.log('error', error);
          return null;
        }
      }
      
      async getPrice(stock) {
        try {
          const result = await got.get(web + 'quoteSummary/' + stock + '?modules=price', {});
          const json = JSON.parse(result.body);
          return json.quoteSummary.result[0].price;
        }
        catch (error) {
          console.log('error', error);
          return null;
        }
      }
  
      async getTest(stock, module) {
        try {
          console.log('url', web + 'quoteSummary/' + stock + '?modules=' + module);
      
          const result = await got.get(web + 'quoteSummary/' + stock + '?modules=' + module, {});
          const json = JSON.parse(result.body);
          return json.quoteSummary.result[0];
        }
        catch (error) {
          console.log('error', error);
          return null;
        }
      }
}

/*
[
  'assetProfile',
  'summaryProfile',
  'summaryDetail', => yes
  'esgScores',
  'price', => yes
  'incomeStatementHistory',
  'incomeStatementHistoryQuarterly',
  'balanceSheetHistory',
  'balanceSheetHistoryQuarterly',
  'cashflowStatementHistory',
  'cashflowStatementHistoryQuarterly',
  'defaultKeyStatistics',
  'financialData',
  'calendarEvents',
  'secFilings',
  'recommendationTrend',
  'upgradeDowngradeHistory',
  'institutionOwnership',
  'fundOwnership',
  'majorDirectHolders',
  'majorHoldersBreakdown',
  'insiderTransactions',
  'insiderHolders',
  'netSharePurchaseActivity',
  'earnings',
  'earningsHistory',
  'earningsTrend',
  'industryTrend',
  'indexTrend', - PEG, PE
  'sectorTrend' - skip
]
  */
