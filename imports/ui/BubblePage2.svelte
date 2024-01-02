<script>
    console.log("BubblePage", "BubblePage");

    import {onMount} from 'svelte';
    import {GoogleCharts} from 'google-charts';
    import {stocks, momentum, donchian} from '../api/TechnicalAnalysis';

    var jsonstocks = {"arr":[]};

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
            hAxis: {title: 'Momentum (RSI)', minValue: -10, maxValue: 110},
            vAxis: {title: 'Donchian', minValue: -10, maxValue: 110},
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
                // Latest index value
                var index = resp.timestamp.length-1;   

                const today = resp.indicators.quote[0].close[index];

                const volume = resp.indicators.quote[0].volume[index];

                const closeArray = resp.indicators.quote[0].close;
                const rsi = closeArray.limit(15).rsi(); // 14 days rsi (one extra due to comparision)
                const donchian = closeArray.limit(20).donchian();

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

                jsonstocks.arr.push({
                    "name":stockName,
                    "today":today,
                    "sma":donchian.sma,
                    "volume":volume,
                    "rsi":rsi,
                    "donchian":donchian,
                    "trend":trend,
                    "squeeze":squeeze,
                    "bollinger":bollinger,
                    "color":color,
                });
                jsonstocks = jsonstocks;
                console.log('mungo', jsonstocks);

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
//    jsonstocks = jsonstocks;
//    jsonstocks.arr = jsonstocks.arr;

let colorPlusMinus = (value) => {
    if (value > 0) 
        return 'lightgreen';
    else
        return '#ffcccc';
}

let colorRSI = (value) => {
    if (value > 70) 
        return '#ffcccc';
    else if (value < 30)
        return 'lightgreen';
}

let colorHighRevenue = (value) => {
    if (value > 1000000) 
        return 'lightgreen';
}
</script>

{no} out of {total} ({100*no/total}%)
<div id="chart_div"/>

<table border="1">
    <thead>
        <tr align="center">
            <th>Stock</th>
            <th>Revenue (mSEK)</th>
            <th>Latest (SEK)</th>
            <th>SMA (20days)    </th>
            <th>Volume</th>
            <th>RSI</th>
            <th>Donchain (%)</th>
            <th>Trend (%)</th>
            <th>Squeeze</th>
            <th>Bollinger</th>
            <th>Color</th>
        </tr>
    </thead>
    <tbody>
    {#each jsonstocks.arr as mystock}
        <tr>
            <th>{mystock.name}</th>
            <td align="right" bgcolor={colorHighRevenue(mystock.today*mystock.volume)}>{Math.round((mystock.today * mystock.volume)/1000/1000).toLocaleString()}</td>
            <td align="right">{Math.round(mystock.today, 2).toLocaleString()}</td>
            <td align="right">{Math.round(mystock.sma, 2).toLocaleString()}</td>
            <td align="right">{mystock.volume.toLocaleString()}</td>
            <td align="right" bgcolor={colorRSI(mystock.rsi)}>{Math.round(mystock.rsi,0)}</td>
            <td align="right">{Math.round(mystock.color, 1)}</td>
            <td align="right" bgcolor={colorPlusMinus(mystock.trend)}>{Math.round(mystock.trend, 2)}</td>
            <td align="right">{mystock.squeeze}</td>
            <td align="right">{mystock.bollinger}</td>
            <td align="right">{mystock.color}</td>
        </tr>
    {/each}
    </tbody>
</table>