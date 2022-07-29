<script>
  import { onMount } from "svelte";

  let collapsed = false;
  let intro = null;
  let showIntro = null;

  $: intro
    ? (intro.onclick = () => {
        collapsed = true;
      })
    : null;

  $: showIntro
    ? (showIntro.onclick = () => {
        collapsed = false;
      })
    : null;
</script>

{#if !collapsed}
  <div id="intro" class="intro" bind:this={intro}>
    <p class="hello">
      Hello! Windows and Me is a window/glass cleaning service. It is currently
      owned and operated by one person.
    </p>
    <p class="hello">
      If you have an invoice from another glass cleaning company and the total
      price is over $30, use the file upload feature and I will beat the price.
    </p>
    <p>
      I will clean your windows, mirrors, and doors (commercial or residential)
      at a fixed price.
    </p>
    <p>
      I will clean inner glass (office windows, mirrors, etc.) if requested.
      Simply add it to the total number of windows.
    </p>
    <p>No contract required. Schedule an appointment whenever you want.</p>
    <p>
      The broader your scheduled time, the better. <span class="bold"
        >I will clean from 8am - 8pm.</span
      >
    </p>
    <p>
      You can schedule recurring appointments. To cancel, simply tell me when I
      arrive at your location to clean, or email me -
      <span class="bold">windowsandmecleaning@gmail.com</span>
    </p>
    <div class="header">Pricing</div>
    <p>
      The price is $2.75 ($4.00 for residential) per window/door/mirror
      (includes both sides of glass).
    </p>
    <p>Minimum price is $20.</p>
    <p>The total price is always rounded down to the nearest dollar.</p>
    <p class="lastPrice">Tips appreciated!</p>
    <div class="header">Exceptions</div>
    <p>
      I will not remove tape, stickers, clean hard water stains, or move
      heavy/fragile items to access a window.
    </p>
    <p class="lastException">
      I will not clean broken / damaged windows. Please do not include these
      windows in your count.
    </p>
    <div class="header">Disclaimer</div>
    <p class="payment">
      As this is a software "beta" / brand new service, I currently only accept
      cash payment. I will email receipt / invoice upon request.
    </p>
    <p class="collapseInfo">
      Click / Tap anywhere in this section to collapse it. <span class="cookies"
        >This site uses <a
          target="__blank"
          href="https://en.wikipedia.org/wiki/Web_storage">browser storage</a
        > to remeber choices like this.</span
      >
    </p>
  </div>
{:else}
  <div id="showIntro" class="showIntro" bind:this={showIntro}>
    Click / Tap to show intro.
  </div>
{/if}

<style>
  .intro {
    font-size: 16px;
    width: fit-content;
  }

  .hello {
    font-size: 20px;
    font-weight: bold;
  }

  .collapseInfo {
    font-weight: bold;
    font-size: 12px;
  }

  .header {
    color: blue;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 3px solid blue;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .cookies {
    font-weight: 400;
    font-style: italic;
  }

  .lastPrice {
    font-weight: bold;
  }

  p {
    margin-bottom: 13px;
  }

  .showIntro {
    background: lightyellow;
    width: fit-content;
    padding: 20px;
    border: 3px solid blue;
    cursor: pointer;
  }

  .bold {
    font-weight: bold;
  }
</style>
