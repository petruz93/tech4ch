<template>
  <div class="home">
  <BubbleChart
    :exhibitData = "loadExhibitData"
    :visitorData = "loadVisitorTest"
    />
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
      loadExhibitData: {},
      loadVisitorTest: {}
    }
  },
  mounted () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const exhibitDataTemp = await d3.json('./map-data.json')
      this.loadExhibitData = exhibitDataTemp
      const visitorDataTemp = await d3.json('./visitorsTest.json')
      this.loadVisitorTest = visitorDataTemp
    }
  }
}

</script>

<style scoped>

</style>
