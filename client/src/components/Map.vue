<template>
  <div class='map'>
<!--    <p class='group' >{{ group }}</p>-->
    <button id='play' @click='moveVisitors'>&#9658;</button>
    <button id='replay' @click='replay'>&#10227;</button>
    <input type='radio' id='slow' name='animation_speed' value='slow' @click="changeSpeed('slow')" />
    <label for='slow'>Slow</label>
    <input type='radio' id='fast' name='animation_speed' value='fast' @click="changeSpeed('fast')" />
    <label for='fast'>Fast</label>
    <img v-for='visitor in post.visitors' :key='visitor' src='human.png' :id='visitor' style='position: absolute;
      width: 30px;
      height: 30px;
      margin: 5px;
      visibility: hidden;' alt='Visitor' />
<!--    <input type='hidden' :value='post.visit' name='visit' />-->
<!--    <p id='visit' style='display:none'>{{ post.visit }}</p>-->
<!--    <input type='hidden' :value='post.visitors' name='visitors' />-->
<!--    <p id='visitors' style='display:none'>{{ post.visitors }}</p>-->
    <br />
    <img src='Clean%20Map.jpg' class='bkg_img'  alt='Map' />
    <p id='timestamp'></p>
  </div>
</template>

<script>
import { MyFunctions } from '../../public/moveVisitors'
export default {
  name: 'Map',
  props: {
    post: Object,
    group: String,
    err: String
  },
  methods: {
    moveVisitors: function () {
      MyFunctions.moveVisitors(this.post.visitors, this.post.visit)
    },
    replay: function () {
      MyFunctions.replay()
    },
    changeSpeed: function (speed) {
      MyFunctions.changeSpeed(speed)
    }
  }
}
</script>
