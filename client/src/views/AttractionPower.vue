<template>
  <div class="home">
  <BubbleChart msg="Bubble chart showing exihibit attraction power"
    :dataset = loadDataBubbleChart />
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from '@/components/BubbleChart.vue'
import * as d3 from 'd3'

export default {
  name: 'AttractionPower',
  components: {
    BubbleChart
  },
  data () {
    return {
      loadDataBubbleChart: {}
    }
  },
  mounted () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const dataBubbleChart = await d3.json('./dataset.json')
      this.loadDataBubbleChart = dataBubbleChart
    }
  }
}

</script>

<style scoped>

</style>
