<script>
  import socket from "../stores/socketio";
  import Intro from "./Intro.svelte";
  import ScheduleAppointment from "./ScheduleAppointment.svelte";

  $socket.on("connect", function () {
    console.log("Connected");
  });
</script>

<main>
  <Intro />
  <ScheduleAppointment />
</main>

<style>
  main {
    margin-top: 67px;
    padding: 0px 20px;
    top: 67px;
  }
</style>
