<script>
    console.log("BubblePage", "BubblePage");

    import {onMount} from 'svelte';
    import {GoogleCharts} from 'google-charts';
    import {stocks, momentum, donchian} from '../api/TechnicalAnalysis';

    var arr = [];

    var no = 0;
    var total = 0;
    
    GoogleCharts.load(drawChart);
    
    function drawChart() {
        console.log('BubblePage', "drawChart()");
        var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));

        var options = {
           title: 'Trend',
            width: 1600,
            height: 800,
            hAxis: {title: 'Momentum (RSI)'},
            vAxis: {title: 'Donchian'},
            colorAxis: {colors: ['red', 'green']}

        };
        var data = google.visualization.arrayToDataTable(arr, true)
        chart.draw(data, options); 
    }

    async function otherAPICall(stockName) {
        Meteor.call('stock.graph', stockName, async (error, resp) => {
            if(error) {
                console.log('BubblePage', error);
            }
            else {    
                const closeArray = resp.indicators.quote[0].close;

                console.log("1", stockName, closeArray);

                var index = resp.timestamp.length-1;   
                const today = resp.indicators.quote[0].close[index];
                const volume = resp.indicators.quote[0].volume[index];


                const rsi = closeArray.limit(15).rsi(); // 14 days rsi (one extra due to comparision)
                console.log("2", stockName, closeArray.limit(15));

                const donchian = closeArray.limit(20).donchian();
                console.log("3", stockName, closeArray.limit(20));

                const color = 100*(today-donchian.low)/(donchian.high-donchian.low);
                const trend = 100*(today-donchian.sma)/donchian.sma;

                const bollinger = closeArray.limit(20).bollinger();
                const squeeze = (bollinger.high - bollinger.low)/donchian.sma;

                if(rsi > 100 || rsi < 0) console.log("rse_error", stockName, today, rsi);
                if(trend > 100 || trend < 0) {
                    console.log("donchian_error", stockName, today, donchian);
                    console.log("donchian______", stockName, resp.indicators.quote[0].close);
                    console.log("donchian______", stockName, resp.indicators.quote[0].close.reverse().limit(20));
                }

                total++;
                if(today * volume > 100000000) {
                    arr.push([stockName, rsi, color, trend, squeeze/10]);
                    no++;
                } else {
                    console.log('low', today*volume);
                }
                //console.log('BubbleChart', stockName, "today=" + today, "rsi=" + rsi, 
                //"donchian=" + color, "trend=" + trend, "squeeze=" + squeeze,
                //"bolinger=", bollinger, "dochian=", donchian);
                drawChart();
            }
        });
    }

    onMount(async () => {
        console.log('BubblePage', "onMount()");

        stocks.forEach(async (stockName) => {
            await otherAPICall(stockName);
        });

        console.log('bye');
	});        
</script>

{no} out of {total} ({100*no/total}%)
<div id="chart_div"/>
