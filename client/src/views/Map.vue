<template>
  <div class='map'>
    <p class='error' v-if='error'>{{ error }}</p>
    <button id='play' onclick='moveVisitors()'>&#9658;</button>
    <button id='replay' onclick='replay()'>&#10227;</button>
    <input type='radio' id='slow' name='animation_speed' value='slow' onclick='changeSpeed(id)' />
    <label for='slow'>Slow</label>
    <input type='radio' id='fast' name='animation_speed' value='fast' onclick='changeSpeed(id)' />
    <label for='fast'>Fast</label>
    <img v-for='visitor in post.visitors' :key='visitor' src='human.png' :id='visitor' style='border: 1px solid red;
      position: absolute;
      width: 30px;
      height: 30px;
      margin: 5px;
      visibility: hidden;' alt='Visitor' />
    <input type='hidden' :value='post.visit' name='visit' />
    <input type='hidden' :value='post.visitors' name='visitors' />
    <br />
    <img src='Clean%20Map.jpg' class='bkg_img'  alt='Map' />
    <p id='timestamp'></p>
  </div>
</template>

<script>
import GroupService from '../GroupService.js'
export default {
  name: 'GroupService',
  data () {
    return {
      post: [],
      error: ''
    }
  },
  async created () {
    try {
      this.post = await GroupService.getVisitGroup()
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>
