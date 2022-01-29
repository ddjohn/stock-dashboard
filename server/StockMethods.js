console.log('StockMethods', 'StockMethods');

import got from 'got';

/*
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
*/

export const stocks = ["%5EOMX",
"AAK.ST",
"FASTAT.ST",
"ABB.ST",
"ABLI.ST",
"ACAD.ST",
"ACQ-SPAC.ST",
"ATIC.ST",
"ACTI.ST",
"ALIF-B.ST",
"ANOD-B.ST",
"ADDT-B.ST",
"AOI.ST",
"AFRY.ST",
"ALFA.ST",
"APAC-SPAC-A.ST",
"ALIG.ST",
"ATORX.ST",
"ALLIGO-B.ST",
"AMBEA.ST",
"ANNE-B.ST",
"ANOT.ST",
"AQ.ST",
"ARP.ST",
"ARION-SDB.ST",
"ARISE.ST",
"ARJO-B.ST",
"ARPL.ST",
"ACE.ST",
"ASSA-B.ST",
"AZN.ST",
"ATCO-A.ST",
"ATCO-B.ST",
"ATRLJ-B.ST",
"ATT.ST",
"ATVEXA-B.ST",
"ALIV-SDB.ST",
"AZA.ST",
"AXFO.ST",
"B3.ST",
"BACTI-B.ST",
"BALCO.ST",
"BEGR.ST",
"BEIA-B.ST",
"BELE.ST",
"BEIJ-B.ST",
"BERG-B.ST",
"BRG-B.ST",
"BESQ.ST",
"BETS-B.ST",
"BETCO.ST",
"BHG.ST",
"BICO.ST",
"BILI-A.ST",
"BILL.ST",
"BIOA-B.ST",
"BIOG-B.ST",
"BINV.ST",
"BIOT.ST",
"BORG.ST",
"BOL.ST",
"BONAV-A.ST",
"BONAV-B.ST",
"BONEX.ST",
"BONG.ST",
"BOOZT.ST",
"BOUL.ST",
"BRAV.ST",
"BRIN-B.ST",
"BTS-B.ST",
"BUFAB.ST",
"BULTEN.ST",
"BURE.ST",
"BFG.ST",
"BMAX.ST",
"CALTX.ST",
"CAMX.ST",
"CANTA.ST",
"CARY.ST",
"CAST.ST",
"CAT-A.ST",
"CAT-B.ST",
"CATE.ST",
"CTM.ST",
"CCC.ST",
"CEVI.ST",
"CBTT-B.ST",
"CIBUS.ST",
"CINT.ST",
"CLAS-B.ST",
"CLA-B.ST",
"COLL.ST",
"CNCJO-B.ST",
"COIC.ST",
"CCOR-B.ST",
"COOR.ST",
"CORE-PREF.ST",
"CORE-A.ST",
"CORE-B.ST",
"CORE-D.ST",
"CRAD-B.ST",
"CRED-A.ST",
"CPAC-SPAC.ST",
"CTEK.ST",
"CTT.ST",
"DEDI.ST",
"DIOS.ST",
"DOM.ST",
"DORO.ST",
"DUNI.ST",
"DURC-B.ST",
"DUST.ST",
"EAST.ST",
"EGTX.ST",
"ELAN-B.ST",
"ELEC.ST",
"EPRO-B.ST",
"ELUX-A.ST",
"ELUX-B.ST",
"EKTA-B.ST",
"ELOS-B.ST",
"ELTEL.ST",
"EMPIR-B.ST",
"ENDO.ST",
"ENEA.ST",
"ENRO.ST",
"ENRO-PREF-A.ST",
"ENRO-PREF-B.ST",
"ENQ.ST",
"EOLU-B.ST",
"EPI-A.ST",
"EPI-B.ST",
"EPIS-B.ST",
"EQT.ST",
"ERIC-A.ST",
"ERIC-B.ST",
"ESSITY-A.ST",
"ESSITY-B.ST",
"ETX.ST",
"EVO.ST",
"EWRK.ST",
"FABG.ST",
"FAG.ST",
"FG.ST",
"BALD-B.ST",
"TRIAN-B.ST",
"FPAR-PREF.ST",
"FPAR-A.ST",
"FPAR-D.ST",
"FOI-B.ST",
"FNM.ST",
"FING-B.ST",
"FMM-B.ST",
"FPIP.ST",
"G5EN.ST",
"GIGSEK.ST",
"GARO.ST",
"GPG.ST",
"GETI-B.ST",
"GHP.ST",
"GRNG.ST",
"GREEN.ST",
"HLDX.ST",
"HNSA.ST",
"HANZA.ST",
"HAV-B.ST",
"HEBA-B.ST",
"HEM.ST",
"HM-B.ST",
"HEXA-B.ST",
"HTRO.ST",
"HPOL-B.ST",
"HMS.ST",
"HOFI.ST",
"HOLM-A.ST",
"HOLM-B.ST",
"HUFV-A.ST",
"HUM.ST",
"HUSQ-A.ST",
"HUSQ-B.ST",
"IAR-B.ST",
"ICA.ST",
"IS.ST",
"IMMU.ST",
"IMMNOV.ST",
"INDU-A.ST",
"INDU-C.ST",
"INDT.ST",
"IBT-B.ST",
"INFREA.ST",
"INSTAL.ST",
"IPCO.ST",
"INTRUM.ST",
"INVE-A.ST",
"INVE-B.ST",
"IVSO.ST",
"INWI.ST",
"IRLAB-A.ST",
"IRRAS.ST",
"ISOFOL.ST",
"ITAB.ST",
"JM.ST",
"JOMA.ST",
"JOSE.ST",
"K2A-PREF.ST",
"K2A-B.ST",
"KABE-B.ST",
"KAR.ST",
"KARO.ST",
"KDEV.ST",
"KFAST-B.ST",
"KIND-SDB.ST",
"KINV-A.ST",
"KINV-B.ST",
"KLARA-B.ST",
"KNOW.ST",
"LAGR-B.ST",
"LAMM-B.ST",
"LATO-B.ST",
"LEO.ST",
"LIFCO-B.ST",
"LIME.ST",
"LINC.ST",
"LIAB.ST",
"LOGI-A.ST",
"LOGI-B.ST",
"LOOMIS.ST",
"LUC.ST",
"LUND-B.ST",
"LUNE.ST",
"LUG.ST",
"LUMI.ST",
"MAHA-A.ST",
"MEAB-B.ST",
"MCAP.ST",
"MCOV-B.ST",
"MVIR-B.ST",
"MEKO.ST",
"MSAB-B.ST",
"MSON-A.ST",
"MSON-B.ST",
"MIDW-A.ST",
"MIDW-B.ST",
"MILDEF.ST",
"TIGO-SDB.ST",
"MIPS.ST",
"MOB.ST",
"MTG-A.ST",
"MTG-B.ST",
"MOMENT.ST",
"MULQ.ST",
"MTRS.ST",
"MYCR.ST",
"NAXS.ST",
"NCAB.ST",
"NCC-A.ST",
"NCC-B.ST",
"NMAN.ST",
"NELLY.ST",
"NETI-B.ST",
"NETEL.ST",
"NEWA-B.ST",
"NGS.ST",
"NIBE-B.ST",
"NIL-B.ST",
"NIVI-B.ST",
"NOBI.ST",
"NOBINA.ST",
"NOLA-B.ST",
"NDA-SE.ST",
"NENT-A.ST",
"NENT-B.ST",
"NPAPER.ST",
"NWG.ST",
"NORB-B.ST",
"SAVE.ST",
"NORVA.ST",
"NOTE.ST",
"NTEK-B.ST",
"NP3.ST",
"NP3-PREF.ST",
"NYF.ST",
"OASM.ST",
"OEM-B.ST",
"ONCO.ST",
"ORES.ST",
"ORX.ST",
"ORTI-A.ST",
"ORTI-B.ST",
"OP.ST",
"OP-PREF.ST",
"OP-PREFB.ST",
"OVZON.ST",
"PNDX-B.ST",
"PEAB-B.ST",
"PIERCE.ST",
"PLAZ-B.ST",
"POOL-B.ST",
"PREC.ST",
"PREV-B.ST",
"PRIC-B.ST",
"PACT.ST",
"PROB.ST",
"PROF-B.ST",
"PRFO.ST",
"PENG-B.ST",
"QLINEA.ST",
"QLIRO.ST",
"RAIL.ST",
"RATO-A.ST",
"RATO-B.ST",
"RAY-B.ST",
"READ.ST",
"REJL-B.ST",
"RESURS.ST",
"RIZZO-B.ST",
"RROS.ST",
"RVRC.ST",
"SAAB-B.ST",
"SAGA-A.ST",
"SAGA-B.ST",
"SAGA-D.ST",
"SBB-B.ST",
"SBB-D.ST",
"SAND.ST",
"SANION.ST",
"SAS.ST",
"SCST.ST",
"SHOT.ST",
"SDIP-PREF.ST",
"SDIP-B.ST",
"SECT-B.ST",
"SECU-B.ST",
"SEMC.ST",
"SENS.ST",
"SEZI.ST",
"SRNKE-B.ST",
"SINCH.ST",
"SINT.ST",
"SIVE.ST",
"SEB-A.ST",
"SEB-C.ST",
"SKA-B.ST",
"SKF-A.ST",
"SKF-B.ST",
"SKIS-B.ST",
"SLEEP.ST",
"SOF-B.ST",
"SFAB.ST",
"SSAB-A.ST",
"SSAB-B.ST",
"STAR-A.ST",
"STAR-B.ST",
"STEF-B.ST",
"SF.ST",
"STWK.ST",
"STE-A.ST",
"STE-R.ST",
"STOR-B.ST",
"STRAX.ST",
"SVIK.ST",
"SVED-B.ST",
"SCA-A.ST",
"SCA-B.ST",
"SHB-A.ST",
"SHB-B.ST",
"SVOL-A.ST",
"SVOL-B.ST",
"SWEC-A.ST",
"SWEC-B.ST",
"SWED-A.ST",
"SWMA.ST",
"SOBI.ST",
"SYNSAM.ST",
"SYSR.ST",
"TBD30-SPAC-A.ST",
"TEL2-A.ST",
"TEL2-B.ST",
"TELIA.ST",
"TETY.ST",
"TFBANK.ST",
"THULE.ST",
"TIETOS.ST",
"TOBII.ST",
"TDVOX.ST",
"TRAC-B.ST",
"TRAD.ST",
"TRANS.ST",
"8TRA.ST",
"TREL-B.ST",
"TROAX.ST",
"TRUE-B.ST",
"VBG-B.ST",
"VNE-SDB.ST",
"VICO.ST",
"VSSAB-B.ST",
"VIT-B.ST",
"VITR.ST",
"VNV.ST",
"VOLO.ST",
"VOLO-PREF.ST",
"VOLCAR-B.ST",
"VOLV-A.ST",
"VOLV-B.ST",
"WALL-B.ST",
"WBGR-B.ST",
"WIHL.ST",
"WISE.ST",
"XANO-B.ST",
"XBRANE.ST",
"XSPRAY.ST",
"XVIVO.ST",
];
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
            console.log('error', stock, error);
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

    async graph(stock) {
        const end = Math.round(Date.now() / 1000)

        var d = new Date();        
        d.setMonth(d.getMonth()-12);
        const start = Math.round(d / 1000);

        try {
            console.log('url', url_v8 + 'chart/' + stock + '?symbol=' + stock + '&period1=0&period2=0&interval=1d');
            const result = await got.get(url_v8 + 'chart/' + stock + '?symbol=' + stock + '&period1=' + start +'&period2=' + end + '&interval=1d', {});
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
https://query1.finance.yahoo.com/v8/finance/chart/ERIC-B.ST?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance
https://query1.finance.yahoo.com/v8/finance/chart/ERIC-B.ST?symbol=ERIC-B.ST&period1=1628287200&period2=1641457518&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=deAirDLypgd&corsDomain=finance.yahoo.com
https://query2.finance.yahoo.com/v10/finance/quoteSummary/AAPL?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend
https://query2.finance.yahoo.com/v7/finance/options/AAPL?date=1679011200
https://stackoverflow.com/questions/44030983/yahoo-finance-url-not-working
*/
