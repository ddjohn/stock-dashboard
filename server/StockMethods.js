console.log('StockMethods', 'StockMethods');

import got from 'got';

export const stocks_omx30 = ["%5EOMX", 
    "ABB.ST", "ALFA.ST", "ALIV-SDB.ST", "ASSA-B.ST", "ATCO-A.ST", 
    "ATCO-B.ST", "AZN.ST", "BOL.ST", "ELUX-B.ST", "ERIC-B.ST", 
    "ESSITY-B.ST", "EVO.ST", "GETI-B.ST", "HEXA-B.ST", "HM-B.ST", 
    "INVE-B.ST", "KINV-B.ST", "NDA-SE.ST", "SAND.ST", "SCA-B.ST", 
    "SEB-A.ST", "SHB-A.ST", "SINCH.ST", "SKA-B.ST", "SKF-B.ST", 
    "SWED-A.ST", "SWMA.ST", "TEL2-B.ST", "TELIA.ST", "VOLV-B.ST"];    

export const stocks_other = [
    "CFISH.ST", "COIC.ST", "DUNI.ST", "NENT-B.ST", //"IMINT.ST",  
    "VBG-B.ST" //"QBIT.ST", "SYNACT.ST",  
];

export const stocks = stocks_omx30.concat(stocks_other);

export const reports = [
    'assetProfile',
    'summaryProfile',
    'summaryDetail',
    'esgScores',
    'price',
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
    'indexTrend',
    'sectorTrend'
];
    
const url_v10 = 'https://query1.finance.yahoo.com/v10/finance/';
const url_v8 = 'https://query1.finance.yahoo.com/v8/finance/';

const modules = 'assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend';    

export class StockMethods {
    constructor() {}

    async getAll(stock) {
        try {
      
            const result = await got.get(url_v10 + 'quoteSummary/' + stock + '?modules=' + modules, {});
            const json = JSON.parse(result.body);
            return json.quoteSummary.result[0];
        }
        catch (error) {
            console.log('error', error);
            return null;
        }
    }

    async getSummary(stock) {
        try {
            console.log('url', url_v10 + 'quoteSummary/' + stock + '?modules=summaryDetail');
      
            const result = await got.get(url_v10 + 'quoteSummary/' + stock + '?modules=summaryDetail', {});
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
            const result = await got.get(url_v10 + 'quoteSummary/' + stock + '?modules=price', {});
            const json = JSON.parse(result.body);
            return json.quoteSummary.result[0].price;
        }
        catch (error) {
            console.log('error', error);
            return null;
        }
    }
  
    async getProfile(stock) {
        try {
            const result = await got.get(url_v10 + 'quoteSummary/' + stock + '?modules=assetProfile', {});
            const json = JSON.parse(result.body);
            return json.quoteSummary.result[0].assetProfile;
        }
        catch (error) {
            console.log('error', error);
            return null;
        }
    }

    
    async getTest(stock, module) {
        try {
            console.log('url', url_v8 + 'chart/' + stock);
            const result = await got.get(url_v8 + 'chart/' + stock, {});
            const json = JSON.parse(result.body);
            return json.chart.result[0];
        }
        catch (error) {
            console.log('error', stock, error);
            return null;
        }
    }

    report() {
        reports.forEach((report) => {
            stockMethods.getTest('ERIC-B.ST', report).then((json) => {
                console.log('report', report);
                console.log(JSON.stringify(json, null, 2));
            });    
        });
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

https://query1.finance.yahoo.com/v8/finance/chart/ERIC-B.ST?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance
https://query1.finance.yahoo.com/v8/finance/chart/ERIC-B.ST?symbol=ERIC-B.ST&period1=1628287200&period2=1641457518&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=deAirDLypgd&corsDomain=finance.yahoo.com
https://query2.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend
https://query2.finance.yahoo.com/v7/finance/options/AAPL?date=1679011200

https://stackoverflow.com/questions/44030983/yahoo-finance-url-not-working


  */
