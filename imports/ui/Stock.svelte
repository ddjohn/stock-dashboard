<script>
    console.log("Stock", "Stock");
    export let stock;
</script>

<tr>
<th>{stock.stock}</th>
<td>{stock.sector}</td>
<td>{stock.industry}</td>

<td class="{stock.today > 0 ? 'success' : 'danger'}">
    {stock.price.toFixed(2)}<br/>
    ({(100*stock.today).toFixed(2)}%)
</td>
<td class="{stock.volumePct > 0.2 ? 'success' : ''}">
    {stock.volume}<br/>
    ({(100*stock.volumePct).toFixed(2)})
</td>

<td class="{stock.price - stock.average50 > 0 ? 'success' : 'danger'}">
    { (100*(stock.price - stock.average50)/stock.average50).toFixed(2) }%
</td>
<td class="{stock.price - stock.average200 > 0 ? 'success' : 'danger'}">
    { (100*(stock.price - stock.average200)/stock.average200).toFixed(2) }% 
</td>

<td>{stock.donchianHigh.toFixed(2)}<br/>{stock.donchianLow.toFixed(2)}</td>
<td class="{((stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow))>0.9 ? 'success' : ''}">
    {(100.0*(stock.price - stock.donchianLow) / (stock.donchianHigh - stock.donchianLow)).toFixed(2)}%
</td>

<td class="{stock.pe < 12 ? 'success' : ''}">{stock.pe}</td>
<td>{stock.peg}</td>
</tr>