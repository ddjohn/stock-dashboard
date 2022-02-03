<script>
    console.log("IotPage", "IotPage");

    import {GoogleCharts} from 'google-charts';

    GoogleCharts.load(drawChart);

    function drawChart() {
        console.log("IotPage", "drawChart()");

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

        console.log("IotPage", "aaa()");

        Meteor.call('iot.graph', function(error, resp) {
            console.log("error", error);
            console.log("resp", resp);

            var data = google.visualization.arrayToDataTable([], true);
            data.addColumn("string", "Date");
            data.addColumn("number", "Temperature");
            data.addColumn("number", "Humidity");

            resp.forEach(element => {
                data.addRow([
                    new Date(element.date).toDateString(), 
                    element.temperature, 
                    element.humidity
                ]); 
            });

            chart.draw(data, options);
        });
        console.log("IotPage", "bbb()");

    }

</script>

<div id="chart_div"/>
