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

    function color(value, color_low, limit_low, color_na, limit_high, color_high) {
        if(value > limit_high)
            return color_high;
    
        if(value < limit_low)
            return color_low;
      
        return color_na;
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

<!-- Price -->
<td class="{color(stock.today, 'danger', 0, 'info', 0, 'success')}">
        {stock.price.toFixed(2)}<br/>
    ({(100*stock.today).toFixed(2)}%)
</td>

<!-- Volume -->
<td class="{color(stock.volumePct, 'info', 0.2, 'info', 0.2, 'success')}">
    {stock.volume}<br/>
    ({(100*stock.volumePct).toFixed(2)})
</td>

<!-- 50 days average-->
<td class="{color(stock.price - stock.average50, 'info', 0.2, 'info', 0.2, 'success')}">
    { (100*(stock.price - stock.average50)/stock.average50).toFixed(2) }%
</td>

<!-- 200 days average-->
<td class="{color(stock.price - stock.average200, 'info', 0.2, 'info', 0.2, 'success')}">
    { (100*(stock.price - stock.average200)/stock.average200).toFixed(2) }% 
</td>

<!-- Donchian tunnel-->
<td class="{color((stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow), 'danger', 0.1, 'info', 0.99, 'success')}">
    {stock.donchianLow.toFixed(2)}-{stock.donchianHigh.toFixed(2)}<br/>
    ({(100.0*(stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow)).toFixed(2)}%)    
</td>

<!-- Bollinger -->
<td class="{colorGreenRed( (stock.price - (stock.average20-2*stock.deviation)) / ( (stock.average20+2*stock.deviation) - (stock.average20-2*stock.deviation)), 0, 0)}">
    {(stock.average20-2*stock.deviation).toFixed(2)} - {(stock.average20+2*stock.deviation).toFixed(2)}<br/>
    ({ (100.0*(stock.price - (stock.average20-2*stock.deviation) ) / ( (stock.average20+2*stock.deviation) - (stock.average20-2*stock.deviation) )).toFixed(2)}%)    
</td>

<!-- Squeeze -->
<td class="{color(4*stock.deviation, 'success', 5, 'info', 5, 'info')}">
    {(4*stock.deviation).toFixed(2)}<br/>
</td>

<!-- Recommenations-->
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