<script>
    console.log("IotGraph", "IotGraph");

    import {GoogleCharts} from 'google-charts';

    GoogleCharts.load(drawChart);

    function drawChart() {
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));

        var options = {
           title: 'Stuga',
            width: 1600,
            height: 800,
            series: {
                0: {targetAxisIndex:0},
                1: {targetAxisIndex:1},
            },
        };

        var data = google.visualization.arrayToDataTable([], true);
        data.addColumn("string", "Date");
        data.addColumn("number", "Temperature");
        data.addColumn("number", "Huidity");


        data.addRow([new Date(0).toDateString(), 10, 10]);
        chart.draw(data, options); 
    }

</script>

<div id="chart_div"/>
