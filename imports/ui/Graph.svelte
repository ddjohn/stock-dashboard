<script>
    console.log("Graph", "Graph");

    import {GoogleCharts} from 'google-charts';
    export let stockName;

    GoogleCharts.load(drawChart);
 
    function drawChart() {
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

        var options = {
            legend: 'none',
            width: 400,
            height: 300,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
            },
 /*
            colors: ['red', 'green'],

            hAxis: {
                format: 'MMM d, y',
                gridlines: {
                    count: 3,
                    color: 'red',
                    minSpacing: 10,
                }
            },
            vAxis: {title: 'Hello', titleTextStyle: {color: '#FF0000'}, gridlines: {count: 3, color: '#333', minSpacing: 20}},
            hAxis: {title: 'Hello', titleTextStyle: {color: '#FF0000'}, gridlines: {count: 3, color: '#333', minSpacing: 20}},

    title:       'gon.pair',
    legend:      'none',
    width:       1200,
    height:      900,
    seriesType: "candlesticks",
    series: { 1: {type: "line"} },
    bar:         { groupWidth: '61.8%' }, // 61.8% - golden ratio (default); 100% - removes space between bars.
    legend: 'none',
            colors: ['red', 'green'],
            candlestick: { fallingColor: { fill: 'red' } },
            candlestick: { fallingColor: { stroke: 'red' } },
            candlestick: { fallingColor: { strokeWidth: 5 } },
            candlestick: { risingColor: { fill: 'green' } },
            candlestick: { risingColor: { stroke: 'green' } },
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#a52714' },  // red
      risingColor:  { strokeWidth: 0, fill: '#0f9d58' }   // green
    }*/
  };

        console.log('options', options);
        //options.hAxis.gridlines.count = 4;

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

<style>
    .modal-dialog {
    max-width: 850px;
    margin: 2rem auto;
}
</style>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Stock: {stockName}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="chart_div"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
