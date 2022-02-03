<script>
  console.log('App', 'App');
  import {Link, Route, Router} from 'svelte-routing';

  import StocksPage from './StocksPage.svelte';
  import GraphPage  from './GraphPage.svelte';
  import BubblePage from './BubblePage.svelte';
  import IotPage    from './IotPage.svelte';
  import IOT from './IOT.svelte';
  
  export let url = '';

  if(window.location.pathname === '/') {
    url = '/stocks';
  }
</script>

<Router url="{url}">
    <Route path="stocks"           component="{StocksPage}"/>
    <Route path="graph/:stockName" component="{GraphPage}"/>
    <Route path="bubble"           component="{BubblePage}"/>
    <Route path="iotgraph"         component="{IotPage}"/> 
    <Route path="data/:temperature/:humidity" component="{IOT}"/> 
</Router>