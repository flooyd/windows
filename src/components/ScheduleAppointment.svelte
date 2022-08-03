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
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
    font-weight: bold;
    color: #333;
  }
  .formContainer {
    background: white;
    padding: 13px;
    border: 3px solid blue;
    width: calc(100% - 40px);
  }
</style>
