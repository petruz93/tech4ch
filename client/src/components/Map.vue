<template>
  <div class='map'>
    <button id='play' @click='moveVisitors'>&#9658;</button>
    <button id='replay' @click='replay'>&#10227;</button>
    <div class='slideContainer'>
      <span style='font-size: 23px'>Speed: </span>
      <input type='range' min='0' max='10' v-bind:value=this.speed id='speedRange' v-on:input=changeSpeed($event)>
    </div>
    <img v-for='visitor in visitors' :key='visitor' src='human.png' :id='visitor' style='position: absolute;
      width: 30px;
      height: 30px;
      margin: 5px;
      visibility: hidden;' alt='Visitor' class='visitor' />
    <br />
    <img src='Clean%20Map.jpg' id='bkg_img'  alt='Map' />
    <p id='timestamp' style='visibility: hidden'>T</p>
    <p id='poiName' style='visibility: hidden'>P</p>
  </div>
</template>

<script>
import { MoveVisitorsFunctions } from '../../public/moveVisitors'
export default {
  name: 'Map',
  props: {
    visit: Array,
    visitors: Array,
    group: String
  },
  data () {
    return {
      speed: 5
    }
  },
  methods: {
    moveVisitors: function () {
      MoveVisitorsFunctions.moveVisitors(this.visitors, this.visit)
    },
    replay: function () {
      MoveVisitorsFunctions.resetVisit(this.visitors)
    },
    changeSpeed: function (speed) {
      MoveVisitorsFunctions.changeSpeed(speed.target.value)
    }
  }
}
</script>
