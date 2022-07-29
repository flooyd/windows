<script>
  import ScheduleForm from "./ScheduleForm.svelte";
</script>

<p class="header">Schedule a cleaning</p>
<div class="formContainer">
  <p>
    Use the form below to schedule your cleaning. Required fields are
    highlighted blue.
  </p>
  <ScheduleForm />
</div>

<style>
  .header {
    font-size: 25px;
    margin-bottom: 20px;
    margin-top: 31px;
    font-weight: bold;
  }
  .formContainer {
    background: lightyellow;
    padding: 20px;
    border: 3px solid blue;
    width: calc(100% - 40px);
  }
</style>
