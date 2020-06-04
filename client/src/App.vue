<template>
  <div id="app">
    <div class="sidenav">
      <p>Museum Project!</p>
      <br>
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/visitors_per_hour">Visitors Per Hour</router-link>
      <br>
      <router-link to="/attr_power">Attraction and Holding Power</router-link>
      <br>
      <router-link to="/playback">PlayBack</router-link>
      <br>
      <router-link to="/visitsummary">Visit Summary</router-link>
    </div>
    <router-view class='main'/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}

.sidenav {
  height: 100%;
  width: 210px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #1d1919;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  /*color: #818181;*/
  color: rgba(255, 255, 255, 0.8);
  display: block;
}

.sidenav p {
  text-decoration: none;
  font-size: 20px;
  /*color: #818181;*/
  color: #f8b739;
  display: block;
}

.sidenav a:hover {
  color: #f8b739;
  /*color: #f1f1f1;*/
}

.sidenav a.router-link-exact-active {
  color: #f8b739;
  /*color: #42b983;*/
}

.main {
  margin-left: 210px; /* Same as the width of the sidenav */
  /*font-size: 28px; !* Increased text to enable scrolling *!*/
  padding: 25px 15px 0px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
