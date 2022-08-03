<script>
  import socket from "../stores/socketio";

  let formIsValid = false;
  let frequency = null;
  let location = null;
  let days = [];
  let numWindows = null;
  let numWindowsHardStains = null;
  let businessName = "";
  let startBy = "8am";
  let finishBy = "8pm";
  let date = "";
  let phone = null;
  let email = null;
  let priceValid = false;
  let form = null;
  let price = 0;

  $: form = {
    formIsValid,
    businessName,
    location,
    phone,
    email,
    numWindows,
    startBy,
    finishBy,
    days,
    frequency,
    date: parseInt(date),
    price,
  };

  $: console.log(form);

  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  const validateForm = () => {
    formIsValid = false;
    checkMinimumPrice();
    if (
      location === null ||
      numWindows === null ||
      numWindows === 0 ||
      startBy === "" ||
      finishBy === ""
    ) {
      return;
    }

    if (days.length === 0 && date === "") {
      return;
    }

    if (days.length > 0 && frequency === null) {
      return;
    }

    if (frequency && days.length === 0) {
      return;
    }

    if (location.length > 0) {
      let testLocation = location.split(",");
      if (testLocation.length != 4) {
        return;
      }
    }

    if (phone === null || phone.toString().length != 10) {
      return;
    }

    if (date.length > 0) {
      if (
        !isNumber(date) ||
        date.length !== 8 ||
        date.includes("e") ||
        date.includes("-")
      ) {
        return;
      }
    }

    if (priceValid) {
      formIsValid = true;
    }
  };

  const checkMinimumPrice = () => {
    price = businessName
      ? Math.floor(numWindows * 2.75)
      : Math.floor(numWindows * 4.0);
    if (price >= 20) priceValid = true;
    else priceValid = false;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    $socket.emit("createJob", form);
  };

  $socket.on("createJob", (data) => console.log(data));

  $socket.on("error", (data) => console.error(data));
  $socket.onAny((event, data) => {
    if (event === "message") {
      console.log(JSON.parse(data).message);
    }
  });

  $socket.emit("findAllJobs");
  $socket.on("findAllJobs", (data) => console.log("jobs", data));
</script>

<form on:submit={(e) => handleSubmitForm(e)}>
  <div class="field">
    <label for="name">Business Name (if residential, leave blank)</label>
    <input
      for="name"
      type="text"
      bind:value={businessName}
      on:change={() => validateForm()}
    />
  </div>
  <div class="field required">
    <label for="location"
      >Location <span class="format"
        >(format: address, city, state, zip code eg. 123 main st, dallas, tx,
        12345)</span
      >
    </label>
    <input
      name="location"
      type="text"
      bind:value={location}
      on:change={() => validateForm()}
    />
  </div>
  <div class="field required">
    <label for="phone"
      >Phone <span class="format"
        >(format: 10 digits - no hypens, eg. 5551234567)</span
      ></label
    >
    <input
      name="phone"
      type="number"
      bind:value={phone}
      on:input={() => validateForm()}
    />
  </div>
  <div class="field">
    <label for="email">Email (recommended if you wish to receive receipt)</label
    >
    <input
      name="email"
      type="email"
      bind:value={email}
      on:input={() => validateForm()}
    />
  </div>
  <div class="field required">
    <label for="numWindows">Number of windows/doors/mirrors</label>
    <input
      name="numWindows"
      type="number"
      bind:value={numWindows}
      on:input={() => validateForm()}
    />
  </div>
  <div class="field required">
    <label for="startBy"
      >Start by <span class="format"
        >(format: #pm or #am - no colons, eg. 830am. Earliest = 8am)</span
      ></label
    >
    <input
      for="startBy"
      type="text"
      bind:value={startBy}
      on:change={() => validateForm()}
    />
  </div>
  <div class="field required">
    <label for="finishBy"
      >Finish by <span class="format"
        >(format: #pm or #am - no colons, eg. 5pm. Latest = 8pm)</span
      >
    </label>
    <input
      for="finishBy"
      type="text"
      bind:value={finishBy}
      on:change={() => validateForm()}
    />
  </div>
  <p class="bold">For a recurring appointment, select a days and frequency.</p>
  <div class="field days">
    <input
      name="monday"
      type="checkbox"
      value="monday"
      bind:group={days}
      on:change={() => {
        date = "";
        validateForm();
      }}
    />
    <label for="monday">Monday</label>
  </div>
  <div class="field days">
    <input
      name="tuesday"
      type="checkbox"
      value="tuesday"
      bind:group={days}
      on:change={() => {
        date = "";
        validateForm();
      }}
    />
    <label for="tuesday">Tuesday</label>
  </div>
  <div class="field days">
    <input
      name="wednesday"
      type="checkbox"
      value="wednesday"
      bind:group={days}
      on:change={() => {
        date = "";
        validateForm();
      }}
    />
    <label for="wednesday">Wednesday</label>
  </div>
  <div class="field days">
    <input
      name="thursday"
      type="checkbox"
      value="thursday"
      bind:group={days}
      on:change={() => {
        date = "";
        validateForm();
      }}
    />
    <label for="thursday">Thursday</label>
  </div>
  <div class="field days">
    <input
      name="friday"
      type="checkbox"
      value="friday"
      bind:group={days}
      on:change={() => {
        date = "";
        validateForm();
      }}
    />
    <label for="friday">Friday</label>
  </div>
  <div class="field">
    <label for="frequency" class="frequency">Frequency</label>
    <select
      bind:value={frequency}
      on:change={() => {
        date = "";
        validateForm();
      }}
    >
      <option value="weekly">Once per week</option>
      <option value="bi-weekly">Every other week</option>
      <option value="monthly">Once per month</option>
      <option value="quarterly">Once per quarter</option>
      <option value="yearly">Once per year</option>
    </select>
  </div>
  <p class="bold">Or, for a single appointment, enter a date.</p>
  <div class="field">
    <label for="date" class="date"
      >Date (format: mmddyyyy - no slashes or hypens)</label
    >
    <input
      name="date"
      type="text"
      bind:value={date}
      on:input={() => {
        days = [];
        frequency = null;
        validateForm();
      }}
    />
  </div>
  {#if priceValid}
    <p class="bold price">
      Price: {numWindows || 0} windows/doors/mirrors = ${businessName
        ? Math.floor(numWindows * 2.75)
        : Math.floor(numWindows * 4.0)}
    </p>
  {/if}
  {#if !priceValid}
    <p class="error">
      Minimum price is $20. Please increase the number of windows/doors/mirrors.
    </p>
  {/if}
  {#if formIsValid && priceValid}
    <button type="submit">Schedule cleaning</button>
  {/if}
</form>

<style>
  form {
    background: #fff;
    color: black;
    padding: 13px;
    margin-top: 20px;
    border: 1px solid black;
  }

  .required {
    color: blue;
  }

  .format {
    color: black;
  }

  input {
    border: 1px solid black;
    height: 25px;
    display: block;
    width: 100%;
    caret-color: black;
  }

  label {
    margin-bottom: 10px;
    display: block;
  }

  .field {
    margin: 16px 0px;
    width: fit-content;
  }

  .field.days {
    display: flex;
    align-items: center;
    margin: 10px 0px;
  }

  .field.days input {
    width: fit-content;
  }

  .field.days label {
    margin: 0px;
    font-weight: 400;
  }

  .frequency {
    font-weight: 400;
  }

  .bold {
    font-weight: bold;
  }

  .date {
    font-weight: 400;
  }

  .price {
    margin: 20px 0px;
  }

  button {
    font-size: 20px;
    background: lightblue;
    padding: 10px;
  }

  input:focus {
    outline-color: blue;
  }

  .error {
    color: red;
  }
</style>
