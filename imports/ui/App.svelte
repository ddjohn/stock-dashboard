<script>
  console.log('App', 'App');

  import Stock from './Stock.svelte';
  import { StockCollection } from '../api/StockCollection';

  $m: stocks = StockCollection.find({}).fetch();
</script>


<div class="container">
  <h1>Stocks!</h1>

  <table class="table table-hover table-sm table-condensed">
    <thead>
      <tr>
        <th>Stock</th>
        <th>Today</th>
        <th>Avg 50</th>
        <th>Avg 200</th>
        <th>Volume</th>
        <th>P/E</th>
      </tr>
    </thead>
    <tbody>
      {#each stocks as stock(stock._id)}
        <Stock stock={stock}/> 
      {/each}
    </tbody>
  </table>
</div>