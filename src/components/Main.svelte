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
    padding: 20px;
  }
</style>
