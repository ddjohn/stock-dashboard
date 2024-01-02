<script>
  console.log('App', 'App');
  import {Link, Route, Router} from 'svelte-routing';

  import LoginPage  from './LoginPage.svelte';
  import StocksPage from './StocksPage.svelte';
  import GraphPage  from './GraphPage.svelte';
  import BubblePage from './BubblePage.svelte';
  import BubblePage2 from './BubblePage2.svelte';
  import IotPage    from './IotPage.svelte';
  import IOT from './IOT.svelte';
  
  export let url = '';

  if(window.location.pathname === '/') {
    url = '/stocks';
  }

  let user = null;

  $m: {
    user = Meteor.user();
  }

  const logout = () => Meteor.logout();
</script>

<br>
<br>
  User: {user}

  {#if user}
    <div class="user" on:click={logout}>
      {user.username} 🚪
    </div>

    <Router url="{url}">
      <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="blog">Blog</Link>
      </nav>
      <Route path="stocks"           component="{StocksPage}"/>
      <Route path="graph/:stockName" component="{GraphPage}"/>
      <Route path="bubble"           component="{BubblePage}"/>
      <Route path="bubble2"           component="{BubblePage2}"/>
      <Route path="iotgraph"         component="{IotPage}"/> 
      <Route path="data/:temperature/:humidity" component="{IOT}"/>
    </Router>
  {:else}
    <LoginPage />
  {/if}
