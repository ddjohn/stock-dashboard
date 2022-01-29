<script>
  console.log('App', 'App');
  import {Link, Route, Router} from 'svelte-routing';

  import Stocks from './Stocks.svelte';
  import Graph from './Graph.svelte';
  import BubbleChart from './BubbleChart.svelte';
  import IOT from './IOT.svelte';
  import IotGraph from './IotGraph.svelte';
  
  export let url = '';

  if(window.location.pathname === '/') {
    url = '/stocks';
  }
</script>

<Router url="{url}">
    <Route path="stocks" component="{Stocks}"/>
    <Route path="graph/:stockName" component="{Graph}"/>
    <Route path="bubble" component="{BubbleChart}"/>
    <Route path="data/:temperature/:humidity" component="{IOT}"/> 
    <Route path="iotgraph/" component="{IotGraph}"/> 
</Router>