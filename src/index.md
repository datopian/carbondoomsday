<div class="page-header">
<div class="row">
    <div class="col-sm-1 col-xs-4 nopadding-right">
        <img class="logo" width="75" src="/img/logo.png">
    </div>
    <div class="col-sm-11 col-xs-8 nopadding-left">
        <h2 class="main-title">State of Carbon</h2>
        <p class="sub-title">caring about climate change since 1958</p>
    </div>
</div>
</div>

```js
const co2 = FileAttachment("./data/co2ppm.csv").csv({typed: true});
```

```js
// display(co2)
```

```js
display(
  Plot.plot({
    title: "Carbon Dioxide atmospheric concentration in parts per million",

    width,
    y: {
      grid: true,
      label: "ppm (parts per million)",
    },
    marks: [
      Plot.frame({fill: "#eaeaea"}),
      Plot.gridY({stroke: "white", strokeOpacity: 1}),
      Plot.gridX({stroke: "white", strokeOpacity: 1}),
      Plot.ruleY([300]),
      Plot.lineY(co2, {x: "date", y: "value", tip: true})
    ]
  })
);
```

--

## Take Action

<div class="grid grid-cols-3">
  <div class="card">

[Give us a star on GitHub](https://github.com/datopian/carbondoomsday) -- takes 5 seconds.

  </div>
  <div class="card">

[Embed this chart](https://carbon.datahub.io/?period=all#) -- takes 2 minutes. 

  </div>
  <div class="card">

[Check out our API](https://datahub.io/core/co2-ppm-daily) -- takes 5 minutes.

  </div>
</div>

---

## About the Project

<div class="grid grid-cols-3">
  <div class="card">

### Mission

What if tracking climate change was as easy as checking the price of Bitcoin?

Every day, NOAA scientists carefully measure the carbon dioxide in the atmosphere from Mauna Loa, Hawaii. This important data is public but hard to digest. We want to empower everyone around the world to use it.

So we built State of Carbon to chart carbon dioxide levels.

Our chart is powered by the worlds first open API for climate change. This enables anyone to enhance NOAAs carbon dioxide data by building charts, sensor networks, and more.

Our code is open source on Github. We are a growing team of 8 people, including programmers, designers and marketers from the USA, Ireland, Australia and Germany.

  </div>
  <div class="card">

### Data Sources

All of our data is thanks to the work of scientists at NOAA's ESRL who have painstakingly measured carbon dioxide every day since 1958. Their data is free and public.

Their release notes say:
"This data is made freely available to the public and the scientific community in the belief that their wide dissemination will lead to greater understanding and new scientific insights."

This data needs to be more accessible. And that's where State of Carbon comes in. We've built a web API and real-time chart of carbon dioxide data.

You can see our most up to date list of sources [on our Github](https://github.com/datopian/carbondoomsday).

  </div>
  <div class="card">

### Team

<div class="team-div">
    <div class="team-container">
    <img src="https://i.imgur.com/XkcNjYd.jpg" class="team-image" alt="Luke Murphy">
    <div class="team-content">
        <p class="team-name">Luke Murphy</p>
        <p class="team-position">Backend Developer</p>
        <p class="team-location">Rotterdam, The Netherlands</p>
    </div>
    </div>
    <div class="team-container">
    <img src="https://i.imgur.com/ZZgP1Un.jpg" class="team-image" alt="Tito Jankowski">
    <div class="team-content">
        <p class="team-name">Tito Jankowski</p>
        <p class="team-position">Water Boy</p>
        <p class="team-location">San Francisco, USA</p>
    </div>
    </div>
    <div class="team-container">
    <img src="https://i.imgur.com/v5WOyPs.jpg" class="team-image" alt="Martin OGrady">
    <div class="team-content"><p class="team-name">Martin O'Grady</p>
        <p class="team-position">Frontend Developer</p>
        <p class="team-location">Dublin, Ireland</p>
    </div>
    </div>
    <div class="team-container">
    <img src="https://i.imgur.com/GbF4PWV.jpg" class="team-image" alt="Stephanie Tassone">
    <div class="team-content"><p class="team-name">Stephanie Tassone</p>
        <p class="team-position">Frontend Developer</p>
        <p class="team-location">Melbourne, Australia</p>
    </div>
    </div>
    <div class="team-container">
    <img src="https://i.imgur.com/pBbJxNn.jpg" class="team-image" alt="Dan Walsh">
    <div class="team-content"><p class="team-name">Dan Walsh</p>
        <p class="team-position">Marketer</p>
        <p class="team-location">San Francisco, USA</p>
    </div>
    </div>
    <div class="team-container">
    <img src="https://i.imgur.com/NvgqRSm.jpg" class="team-image" alt="Purin Phanichphant">
    <div class="team-content">
        <p class="team-name">Purin Phanichphant</p>
        <p class="team-position">UX/UI</p>
        <p class="team-location">San Francisco, USA</p>
    </div>
    </div>
</div>

  </div>
</div>




<style>
.team-div {
  font-size: small;
}
.team-name {
    font-weight: bold;
    margin: 0;
}
.team-location {
    font-style: italic;
    margin: 0;
}
.team-position {
    margin: 0;
}
.team-image {
    border-radius: 100px;
    margin: 10px 10px 10px 0 !important;
    width: 55px;
    height: 55px;
}
.team-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
        flex-direction: row;
    -ms-flex-align: center;
        align-items: center;
    padding: 2px 0 2px 0;
}
</style>