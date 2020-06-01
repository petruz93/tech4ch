<template>
  <div>
    <h1>Visits Per Hour Charts</h1>
    <p class ='error' v-if='visitsPerHourData===[]'> visitsPerHour props is empty! </p>
      <BarChart
        :barChartData=this.visitsPerHour
      />
      <h1>Visits Per Room Per Hour Charts</h1>
      <SNHBarChart
        :stackedBarChartData=this.visitsPerRoomPerHour
      />
  </div>
</template>

<script>
// @ is an alias to /src
// import moment from 'moment'
// import axios from 'axios'
import * as d3 from 'd3'
import FetchDataUtils from '@/FetchDataUtils'

export default {
  name: 'VisitorsPerHour',
  components: {
    BarChart: () => import('@/components/BarChart.vue'),
    SNHBarChart: () => import('@/components/StackedBarChart')
  },
  data () {
    return {
      exhibitData: [],
      visitData: [],
      visitsPerHourData: [],
      visitsPerRoomPerHourData: [],
      repository: ''
    }
  },
  async created () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData () {
    //   const exhibitDataTemp = await d3.json('./map-data.json')
    //   this.exhibitData = exhibitDataTemp
    //   const visitDataTemp = await d3.json('./visitorsTest.json')
    //   this.visitData = visitDataTemp
    //   this.visitsPerHourData = this.visitsPerHour
    //   this.visitsPerRoomPerHour = this.visitsPerHour
      // Get data from the backend
      try {
        const allData = await FetchDataUtils.getAllData()
        const PoICoordinates = {}
        for (const poi of allData.mapData) {
          PoICoordinates[poi.name] = {
            x: poi.x,
            y: poi.y,
            room: poi.room
          }
        }
        this.exhibitData = PoICoordinates
        const visitDataTemp = await allData.visitorsData
        this.visitData = visitDataTemp
        this.groupList = this.visitorsData.map(visitorData => visitorData.groupID)
        // Cut group duplicates
        this.groupList = this.groupList.filter((groupElement, groupIndex) => this.groupList.indexOf(groupElement) === groupIndex)
      } catch (error) {
        this.error = error.message
      }
    }
  },
  computed: {
    // Given the visits array, outputs an array of 24 elements representing
    // the number of visits for a given hour
    visitsPerHour () {
      let i = 0
      const visitsPerHour = []
      // console.log(_.get(this.visitDataProp, 'positions'))
      while (i < 24) {
        const visitsPerHourTemp = this.visitData
          .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
        visitsPerHour[i] = visitsPerHourTemp
        i++
      }
      return visitsPerHour.map(vph => vph.length)
    },
    allVisitExhibits () {
      const visitPositions = this.visitData
        .map(v => v.positions)
      return d3
        .nest()
        .key(d => d.exhibit)
        .entries(visitPositions)
      // d3
      //   .nest()
      //   .key(d => d.positions)
      //   .entries(this.visitData)
    },
    exhibitToVisit () {
      const exhibitToVisit = d3
        .nest()
        .key(d => d.positions.exhibit)
        .entries(this.visitData)
      return exhibitToVisit
    },
    visitsPerRoomPerHour () {
      let i = 0
      const visitsPerHour = []
      const visitsPerRoomPerHourArray = []
      // console.log(_.get(this.visitDataProp, 'positions'))
      while (i < 24) {
        const visitsPerHourTemp = this.visitData
          .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
        visitsPerHour[i] = visitsPerHourTemp
        const visitsPerRoomPerHour = {}
        visitsPerRoomPerHour.room = visitsPerHourTemp.room
        visitsPerRoomPerHour.visits = visitsPerHourTemp.length
        visitsPerRoomPerHourArray.push(visitsPerRoomPerHour)
        i++
      }
      return visitsPerRoomPerHourArray
    }
  }
}

</script>

<style scoped>

</style>
