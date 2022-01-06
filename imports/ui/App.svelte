<script>
  console.log('App', 'App');

  import Stock from './Stock.svelte';
  import { StockCollection } from '../api/StockCollection';

  $m: stocks = StockCollection.find({}, {sort: {stock: 1}}).fetch();
</script>


<div class="container">
  <h1>Stocks!</h1>

  <table class="table table-hover table-sm table-condensed">
    <thead>
      <tr class="info">
        <th colspan="3">About</th>
        <th colspan="2">Price/Volume</th>
        <th colspan="2">Trends</th>
        <th colspan="2">Analysis</th>
        <th colspan="2">Finance</th>
      </tr>
      <tr class="info">
        <th>Stock</th>
        <th>Sector</th>
        <th>Industry</th>

        <th>Price (today)</th>
        <th>Volume (today)</th>

        <th>Average (50days)</th>
        <th>Average (200days)</th>
        
        <th>Donchian</th>
        <th>D</th>

        <th>P/E</th>
        <th>PEG</th>

      </tr>
    </thead>
    <tbody>
      {#each stocks as stock(stock._id)}
        <Stock stock={stock}/> 
      {/each}
    </tbody>
  </table>
</div>