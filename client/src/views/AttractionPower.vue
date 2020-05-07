<template>
  <div>
    <BubbleChart
      v-if="!undefined"
      :exhibitDataProp=loadExhibitData
      :visitorDataProp=loadVisitorData />
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
      loadExhibitData: [],
      loadVisitorData: []
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
      this.loadVisitorData = visitorDataTemp
    }
  }
}

</script>

<style scoped>

</style>
