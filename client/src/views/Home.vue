<template>
  <div class="home">
    <HelloWorld/>
  <!-- <img src="@/assets/museum_clean_map.jpg" width=135%, height=135% /> -->
  <!-- <BarChart :barChartData = loadDataBarChart /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>

</style>
