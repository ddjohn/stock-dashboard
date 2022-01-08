<script>
    console.log("Stocks", "Stocks");

    export let stock;


function colorGreenRed(value, green , red) {
    if(value < red)
      return 'danger';
    
    if(value > green)
      return 'success';
      
    return 'info';
}

function colorRedGreen(value, red, green) {
    if(value > red)
      return 'danger';
    
    if(value < green)
      return 'success';
      
    return 'info';
}
</script>

<style>
td { 
    text-align: center;
}
</style>

<tr>
<th class="info">
    <a target="_blank" href="/graph/{stock.stock}" class="btn btn-primary">
        <span class="glyphicon glyphicon-stats"></span>
    </a>
    <a href="#" class="tooltip-test" title="{stock.short} ({stock.sector} - {stock.industry})">
        {stock.stock}
    </a>
</th>

<td class="{colorGreenRed(stock.today, 0, 0)}">
        {stock.price.toFixed(2)}<br/>
    ({(100*stock.today).toFixed(2)}%)
</td>
<td class="{colorGreenRed(stock.volumePct, 0.2, -999)}">
    {stock.volume}<br/>
    ({(100*stock.volumePct).toFixed(2)})
</td>

<td class="{colorGreenRed(stock.price - stock.average50, 0, -999)}">
    { (100*(stock.price - stock.average50)/stock.average50).toFixed(2) }%
</td>
<td class="{colorGreenRed(stock.price - stock.average200, 0, -999)}">
    { (100*(stock.price - stock.average200)/stock.average200).toFixed(2) }% 
</td>

<td class="{colorGreenRed((stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow), 0.99, -1)}">
    {stock.donchianLow.toFixed(2)}-{stock.donchianHigh.toFixed(2)}<br/>
    ({(100.0*(stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow)).toFixed(2)}%)    
</td>

<td class="{colorGreenRed( (stock.price - (stock.average20-2*stock.deviation)) / ( (stock.average20+2*stock.deviation) - (stock.average20-2*stock.deviation)), 0, 0)}">
    {(stock.average20-2*stock.deviation).toFixed(2)} - {(stock.average20+2*stock.deviation).toFixed(2)}<br/>
    ({ (100.0*(stock.price - (stock.average20-2*stock.deviation) ) / ( (stock.average20+2*stock.deviation) - (stock.average20-2*stock.deviation) )).toFixed(2)}%)    
</td>

<td class="{colorGreenRed( 4*stock.deviation, -99, 5)}">
    {(4*stock.deviation).toFixed(2)}<br/>
</td>

<td class="{colorGreenRed(stock.recommendations.strongBuy+stock.recommendations.buy-stock.recommendations.sell-stock.recommendations.strongSell,0, 0)}">
    {#if stock.recommendations.hold}
    <button class="btn btn-danger" type="button">{stock.recommendations.strongSell}</button>
    <button class="btn btn-danger" type="button">{stock.recommendations.sell}</button>
    <button class="btn btn-warning" type="button">{stock.recommendations.hold}</button>
    <button class="btn btn-success" type="button">{stock.recommendations.buy}</button>
    <button class="btn btn-success" type="button">{stock.recommendations.strongBuy}</button>
    {/if}

</td>

<td class="{colorRedGreen(stock.pe, 12, 12)}">{stock.pe}</td>
<td>{stock.peg}</td>
</tr>