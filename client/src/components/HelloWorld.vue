<template>
  <div class="hello">
    <h1>Tech4ch museum project guide</h1>
    <p>The applications consists of 4 sheets, each one will be discussed separately</p>

    <ul>
      <li>Visitors Per Hour
        <ul>
          <li>This sheet represents statistics about the number of visitors present in the museum (y axis) at any given relevant hour (x axis).
            On the top there’s a button to change perspective to the one room specific. The dropdown can be used to switch on a room specific chart.
            Both charts only represent the hours registering visits.
          </li>
        </ul>
      </li>
      <br>
      <li>Attraction and Holding Power
        <ul>
          <li>This sheet consists in a map that will be populated by a bubble chart whose elements represent the map coordinates of each point of interest of the museum, range and color respectively scaling up and from  light yellow to red depending on the relative attraction or holding power (both normalized by their relative max value).
            To trigger the map population, hit the refresh button.
            Hitting the button on top lets the user change from attraction to holding power and vice versa.
          </li>
        </ul>
      </li>
      <br>
      <li>Playback
        <ul>
          <li>This sheet allows the user to replay a group visit. Selecting a group and pressing the play button makes possible to see how the visitors moved around the museum map via a graphical representation on the map. It’s possible to reset the visit with the reset button and to change the speed visit with the slider under said button.
            Below the map it’s possible to see the current timestamp of the moving visitor and the name of the Point of Interest where he’s/she’s headed.
          </li>
        </ul>
      </li>
      <br>
      <li>Visit Summary
        <ul>
          <li>
            This sheet allows the user to see the visit summary about a group of visitors or the single visitor. To switch between them, the user can use the radio buttons on the top and the content of the dropdown menu will be updated automatically. By clicking on the View summary! button it’s possible to see the summary of the group/visitor.
          </li>
        </ul>
      </li>
    </ul>

    <p>
      For additional information, contact us by e-mail:
      <ul>
        <li><a href='mailto:ale.aurora@stud.uniroma3.it'>ale.aurora@stud.uniroma3.it</a></li>
        <li><a href='mailto:sim.pietrogiacomi@gmail.com'>sim.pietrogiacomi@gmail.com</a></li>
        <li><a href='mailto:mat.petruzziello@stud.uniroma3.it'>mat.petruzziello@stud.uniroma3.it</a></li>
      </ul>
    </p>

    <p>@Copyright: Alessandro Aurora, Simone Pietrogiacomi, Matteo Petruzziello - 2020</p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: left;
}
a {
  color: #42b983;
}
</style>
