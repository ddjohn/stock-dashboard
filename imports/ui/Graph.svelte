<script>
    console.log("Graph", "Graph");

    import {GoogleCharts} from 'google-charts';
    export let stockName;

    GoogleCharts.load(drawChart);
 
    function drawChart() {
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

        var options = {
           // legend: 'none',
           title: 'Stock: ' + stockName,
            width: 1600,
            height: 800,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            },
        };

        Meteor.call('stock.graph', stockName, function(error, resp) {
            console.log("error", error);

            var data = [];
            for (let [index, val] of resp.timestamp.entries()) {
                data.push([ 
                    new Date(val * 1000).toDateString(), 
                    resp.indicators.quote[0].low[index], 
                    resp.indicators.quote[0].open[index], 
                    resp.indicators.quote[0].close[index], 
                    resp.indicators.quote[0].high[index],
                ]);
            }

            console.log('data', data);
            var data2 = google.visualization.arrayToDataTable(data, true);
            chart.draw(data2, options); 
        });
    }

</script>

<div id="chart_div"/>
