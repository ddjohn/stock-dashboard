<script>
    import { Meteor } from 'meteor/meteor';

    let username = "";
    let password = "";

    const handleSubmit = () => {
        Meteor.loginWithPassword(username, password);
    }
</script>

<br>
<br>
<br>
<br>

<form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div>
        <label htmlFor="username">Username</label>

        <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
        />
    </div>

    <div>
        <label htmlFor="password">Password</label>

        <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
        />
    </div>
    <div>
        <button type="submit">Log In</button>
    </div>
</form>