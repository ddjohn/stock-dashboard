<script>
  console.log('Stocks', 'Stocks');  

  import Stock from './Stock.svelte';
  import { StockCollection } from '../api/StockCollection';

  require('../api/TechnicalAnalysis');
  
  let searchTerm = '';

  $m: stocks = StockCollection.find({}, {sort: {stock: 1}}).fetch();
	$: filteredStocks = stocks.filter(stock => stock.stock.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

</script>

<div class="responsive">
  <h1>Stocks!</h1>

  <table border="1" class="table table-hover table-sm table-condensed">
    <thead>
      <tr class="info">
        <th colspan="1"><input type="search" placeholder="Search..." bind:value={searchTerm}/></th>
        <th colspan="2">Price/Volume</th>
        <th colspan="2">Trends</th>
        <th colspan="4  ">Analysis</th>
        <th colspan="2">Finance</th>
      </tr>
      <tr class="info">
        <th>Stock</th>

        <th>Price (today)</th>
        <th>Volume (today)</th>

        <th>Average (50days)</th>
        <th>Average (200days)</th>
        
        <th>Donchian</th>
        <th>Bollinger</th>
        <th>Squeeze</th>
        <th>Recommendations</th>

        <th>P/E</th>
        <th>PEG</th>
 
      </tr>
    </thead>
    <tbody>
      {#each filteredStocks as stock(stock._id)}
        <Stock stock={stock}/> 
      {/each}
    </tbody>
  </table>
</div>