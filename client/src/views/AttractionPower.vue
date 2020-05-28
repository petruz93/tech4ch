<template>
  <div>
    <BubbleChart
      v-if="!undefined"
      :exhibitDataProp=exhibitData
      :visitorDataProp=loadVisitorData
      :bubbleChartData=attractionPowers
      :bubbleChartCoordinates=pointOfInterests
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
      loadVisitorData: [],
      exhibitData: []
    }
  },
  created () {
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
      this.exhibitData = this.prepareExhibitData
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
    },
    pointOfInterests () {
      return this.exhibitData.map(d =>
        [d.x, d.y])
    },
    exhibitToVisits () {
      const visits = this.visitorData
        .map(v =>
          v.positions.map(p =>
            p.exhibit)
            .reduce((count, exhibit) =>
              count + exhibit
            ))
      console.log('visits:', visits)
      return visits
    },
    attractionPowers () {
      const visitorDataLength = this.visitorData.length
      console.log('attractionPower', this.exhibitData.map(e => this.exhibitVisits.map(ev => ev / visitorDataLength)))
      return this.exhibitData.map(e => this.exhibitVisits.map(ev => ev / visitorDataLength))
    }
  }
}

</script>

<style scoped>

</style>
