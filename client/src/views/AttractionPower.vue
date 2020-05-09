<template>
  <div>
    <BubbleChart
      v-if="!undefined"
      allData="loadAllData" />
       <!-- :exhibitData=loadExhibitData
      :visitorData=loadVisitorData -->
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
      loadAllData: []
      // loadExhibitData: [],
      // loadVisitorData: []
    }
  },
  async created () {
    console.log('Data read')
    this.fetchAllData()
  },
  async mounted () {
    console.log('App loaded')
    // this.fetchData()
  },
  methods: {
    async fetchAllData () {
      try {
        const allData = await d3.json(UploadUtils.getAllData())
        this.loadAllData = allData
      } catch (err) {
        this.err = err.message
      }
    }
    // async fetchData () {
    //   const exhibitDataTemp = await d3.json('./map-data.json')
    //   this.loadExhibitData = exhibitDataTemp
    //   const visitorDataTemp = await d3.json('./visitorsTest.json')
    //   this.loadVisitorData = visitorDataTemp
    // }
  }
}

</script>

<style scoped>

</style>
