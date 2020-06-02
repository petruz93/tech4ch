<template>
  <div>
    <h1>Visits Per Hour Charts</h1>
      <BarChart
        v-if='visitsPerHourValues===[]'
        :barChartData=visitsPerHourValues
        :barChartLabels=countRelevantHours
      />
      <h1>Visits Per Room Per Hour Charts</h1>
      <BarChart
        :barChartData=visitsPerRoomPerHour
        :barChartLabels=countRelevantHours
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
    BarChart: () => import('@/components/BarChart.vue')
    // SNHBarChart: () => import('@/components/StackedBarChart')
  },
  data () {
    return {
      exhibitData: [],
      visitData: []
    }
  },
  async created () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const allData = await FetchDataUtils.getAllData()
        this.exhibitData = allData.mapData
        const visitDataTemp = await allData.visitorsData
        this.visitData = visitDataTemp
        this.groupList = this.visitorsData.map(visitorData => visitorData.groupID)
      } catch (error) {
        this.error = error.message
      }
    },
    countVisitsPerRoom (positionArray) {
      const result = {}
      const self = this
      if (positionArray instanceof Array) {
        positionArray.forEach(function (v, i) {
          if (!result[self.exhibitData[v.exhibit].room]) {
            console.log('room', self.exhibitData[v.exhibit].room)
            result[self.exhibitData[v.exhibit].room] = [v.startTime.split(':')[0]]
          } else {
            result[self.exhibitData[v.exhibit].room].push(v.startTime.split(':')[0])
          }
        })
      }
      return result
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
          // .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
          .filter(visit => Number(visit.startVisit.split(':')[0]) === i)
        visitsPerHour[i] = visitsPerHourTemp
        i++
      }
      return visitsPerHour.map(vph => vph.length)
    },
    visitsPerHourValues () {
      return this.visitsPerHour.filter(v => v !== 0)
    },
    exhibitToVisit () {
      const exhibitToVisit = d3
        .nest()
        .key(d => d.positions.exhibit)
        .entries(this.visitData)
      return exhibitToVisit
    },
    // getAllRooms () {
    //   return this.countVisitsPerRoom.
    // },
    visitsPerRoomPerHour () {
      const self = this
      // console.log(this.visitData[0].positions)
      // console.log(this.countVisitsPerRoom(this.visitData[0].positions))
      return this.visitData.map(v => v.positions).map(v => self.countVisitsPerRoom(v))
    },
    // visitsPerRoomPerHour () {
    //   let i = 0
    //   const visitsPerHour = []
    //   // console.log(_.get(this.visitDataProp, 'positions'))
    //   while (i < 24) {
    //     const visitsPerHourTemp = this.visitData
    //       .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
    //     visitsPerHour[i] = visitsPerHourTemp
    //     i++
    //   }
    //   return visitsPerHour.forEach(v.
    //   // .map(vph => { room: vph.room, vph.length })
    // },
    countRelevantHours () {
      return Object.keys(this.visitsPerHour).filter(v => this.visitsPerHour[v] !== 0)
    }
  }
}

</script>

<style scoped>

</style>
