<template>
  <div>
    <BubbleChart
      v-if="!undefined"
      :exhibitDataProp=loadExhibitData
      :visitorDataProp=loadVisitorData
      />
<!-- allData="loadAllData" -->
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleChart from '@/components/BubbleChart.vue'
import UploadUtils from '@/UploadUtils.js'
import * as d3 from 'd3'

export default {
  name: 'AttractionPower',
  components: {
    BubbleChart
  },
  data () {
    return {
      // loadAllData: []
      loadExhibitData: [],
      loadVisitorData: []
    }
  },
  async created () {
    console.log('Data read')
    // this.fetchAllData()
  },
  async mounted () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchAllData () {
      try {
        const allData = await d3.json(UploadUtils.getAllData())
        this.loadAllData = allData
      } catch (err) {
        this.err = err.message
      }
    },
    async fetchData () {
      const exhibitDataTemp = await d3.json('./map-data.json')
      this.loadExhibitData = exhibitDataTemp
      const visitorDataTemp = await d3.json('./visitorsTest.json')
      this.loadVisitorData = visitorDataTemp
    }
  },
  computed: {
    prepareVisitorData () {
      const visitorDataSet = d3
        .entries(this.visitorDataProp)
      const allVisitors = { id: 'visitorData', values: visitorDataSet }
      return allVisitors
    },
    prepareExhibitData () {
      const exhibitDataSet = d3
        .entries(this.exhibitDataProp)
      const allExihibits = { id: 'exhibitData', values: exhibitDataSet }
      return allExihibits
    },
    scaleRadius () {
      const r = d3
        .scaleLinear()
        .domain([0, Math.max(...this.calculateAttractionPower())])
        .range([0, 100])
      console.log('r', r)
      return r
    }
  }
}

</script>

<style scoped>

</style>
