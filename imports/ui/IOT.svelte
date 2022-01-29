<script>
    console.log("IOT", "IOT");
    
    export let temperature;
    export let humidity;
 
    import { IotAPI } from '../api/IotAPI';
    Meteor.call('iot.insert', temperature, humidity);
</script>

{location}
