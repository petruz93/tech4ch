<template>
  <div class='map'>
    <button id='play' @click='moveVisitors' class='button-css'>&#9658;</button>
    <button id='replay' @click='replay' class='button-css'>&#10227;</button>
    <div class='slideContainer'>
      <span>Speed: </span>
      <input type='range' min='0' max='10' v-bind:value=this.speed id='speedRange' v-on:input=changeSpeed($event)>
    </div>
    <img v-for='visitor in visitors' :key='visitor' src='human.png' :id='visitor' alt='Visitor' class='visitor' />
    <br />
    <img src='Clean%20Map.jpg' id='bkg_img'  alt='Map' />
    <p id='timestamp' class='p_hidden'>T</p>
    <p id='poiName' class='p_hidden'>P</p>
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

<style scoped>
div.slideContainer span {
  font-size: 23px;
}

.visitor {
  position: absolute;
  width: 30px;
  height: 30px;
  margin: 5px;
  visibility: hidden;
}

.p_hidden {
  visibility: hidden
}

.button-css {
  /*display: block;*/
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  /*padding: .6em 1.4em .5em .8em;*/
  padding: .6em .6em .6em .6em;
  width: 65px;
  /*max-width: 100%;*/
  box-sizing: border-box;
  margin: auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  /*background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),*/
  /*linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);*/
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
</style>
