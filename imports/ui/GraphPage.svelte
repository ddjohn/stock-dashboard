<script>
    console.log("GraphPage", "GraphPage");

    import {GoogleCharts} from 'google-charts';
    export let stockName;

    GoogleCharts.load(drawChart);

    function bollinger(arr, index, size) {
        if(index-size < 0) {
            return NaN;
        }
        
        const numArray =  arr.slice(index-size, index);

        const mean = numArray.reduce((s, n) => s + n) / numArray.length;
        const variance = numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
        const stddev = Math.sqrt(variance);
        
        return {
            high: mean + 2 * stddev,
            low: mean - 2 * stddev,
        }
    }


    function donchian(arr, index, size) {
        if(index-size < 0) {
            return NaN;
        }

        const numArray =  arr.slice(index-size, index);

        return {
            high: numArray.reduce((a,b) => {return a > b ? a : b}), 
            low: numArray.reduce((a,b) => {return a < b ? a : b})
        };
    }

    function sma(arr, index, size) {
        if(index-size < 0) {
            return NaN;
        }

        return arr.slice(index-size, index).reduce((a,v,i)=>(a*i+v)/(i+1));
   }

    function drawChart() {
        console.log("GraphPage", "drawChart()");

        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));

        var options = {
           title: 'Stock: ' + stockName,
            width: 1600,
            height: 800,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            },
            seriesType: 'candlesticks',
            vAxes: {
                2: {minValue: -1, maxValue: 1, textPosition: 'none'}
            },
            series: {
                0: {targetAxisIndex:1},
                1: {type: 'bars', targetAxisIndex:0, color: 'lightgray'},
                2: {type: 'line', targetAxisIndex:1, color: 'blue'},
                3: {type: 'line', targetAxisIndex:1, color: 'red'},
                4: {type: 'line', targetAxisIndex:1, color: 'green'},
                5: {type: 'line', targetAxisIndex:1, color: 'yellow'},
                6: {type: 'line', targetAxisIndex:1, color: 'yellow', visibleInLegend: false},
                7: {type: 'line', targetAxisIndex:1, color: 'purple'},
                8: {type: 'line', targetAxisIndex:1, color: 'purple', visibleInLegend: false},
                9: {type: 'line', targetAxisIndex:2, color: 'cyan'},
            },
            //curveType: "function"
        };

        Meteor.call('stock.graph', stockName, function(error, resp) {
            console.log("error", error);
            console.log("resp", resp);

            var data = google.visualization.arrayToDataTable([], true);
            data.addColumn("string", "Time");
            data.addColumn("number", "Candlestick");
            data.addColumn("number", "Open");
            data.addColumn("number", "Close");
            data.addColumn("number", "High");
            data.addColumn("number", "Volume");
            data.addColumn("number", "SMA20");
            data.addColumn("number", "SMA50");
            data.addColumn("number", "SMA200");
            data.addColumn("number", "Donchian");
            data.addColumn("number", "Donchian");
            data.addColumn("number", "Bollinger");
            data.addColumn("number", "Bollinger");
            data.addColumn("number", "MACD");

            for (let [index, val] of resp.timestamp.entries()) {
                if(index > resp.timestamp.length-50) {

                    console.log(donchian(resp.indicators.quote[0].high, index, 20));
                    data.addRow([ 
                        new Date(val * 1000).toDateString(), 
                        resp.indicators.quote[0].low[index], 
                        resp.indicators.quote[0].open[index], 
                        resp.indicators.quote[0].close[index], 
                        resp.indicators.quote[0].high[index],
                        resp.indicators.quote[0].volume[index],
                        sma(resp.indicators.quote[0].close, index, 20),
                        sma(resp.indicators.quote[0].close, index, 50),
                        sma(resp.indicators.quote[0].close, index, 200),
                        donchian(resp.indicators.quote[0].high, index, 20).high,
                        donchian(resp.indicators.quote[0].low, index, 20).low,
                        bollinger(resp.indicators.quote[0].close, index, 20).high,
                        bollinger(resp.indicators.quote[0].close, index, 20).low,
                        sma(resp.indicators.quote[0].close, index, 12) - sma(resp.indicators.quote[0].close, index, 26),
                    ]);
                }
            }
            chart.draw(data, options); 
        });
    }

</script>

<div id="chart_div"/>
