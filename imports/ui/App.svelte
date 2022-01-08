<script>
  console.log('App', 'App');
  import {Link, Route, Router} from 'svelte-routing';

  import Stocks from './Stocks.svelte';
  import Graph from './Graph.svelte';
  
  export let url = '';

  if(window.location.pathname === '/') {
    url = '/stocks';
  }
</script>

<Router url="{url}">
    <Route path="stocks" component="{Stocks}"/>
    <Route path="graph/:stockName" component="{Graph}"/>
</Router>