<template>
  <div>
    <select @change="selectGroup">
      <option v-for='group in this.post.groupList' :key='group' v-bind:value='group'>{{ group }}</option>
    </select>
    <p class='error' v-if='this.err'>{{ this.err }}</p>
    <Map :post=this.post :err=this.err :group=this.group></Map>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import GroupService from '../GroupService.js'
import { MyFunctions } from '../../public/moveVisitors'
export default {
  name: 'PlayBack',
  data () {
    return {
      post: {},
      group: '',
      err: ''
    }
  },
  async created () {
    try {
      this.post = await GroupService.getVisitGroup()
      // console.log(typeof this.post.visit)
    } catch (err) {
      this.err = err.message
    }
  },
  components: {
    Map
  },
  methods: {
    selectGroup (e) {
      if (e.target.options.selectedIndex > -1) {
        console.log(e.target.options[e.target.options.selectedIndex].value)
        this.group = e.target.options[e.target.options.selectedIndex].value
        MyFunctions.replay(this.post.visitors)
      }
    }
  }
}
</script>

<style scoped>

</style>
