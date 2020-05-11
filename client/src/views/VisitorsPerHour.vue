<template>
  <div>
    <h1>Visits Per Hour Charts</h1>
    <form action="#" @submit.prevent="getIssues">
      <div class="form-group">
        <input
          type="text"
          placeholder="owner/repo Name"
          v-model="repository"
          class="col-md-2 col-md-offset-5"
        >
      </div>
    </form>
    <p class ='error' v-if='visitsPerHourData===[]'> visitsPerHour props is empty! </p>
      <BarChart
      :visitsPerHour=this.visitsPerHourData
      />
  </div>
</template>

<script>
// @ is an alias to /src
// import moment from 'moment'
// import axios from 'axios'
import * as d3 from 'd3'

export default {
  name: 'VisitorsPerHour',
  components: {
    BarChart: () => import('@/components/BarChart.vue')
  },
  data () {
    return {
      exhibitData: [],
      visitData: [],
      visitsPerHourData: [],
      repository: ''
    }
  },
  created () {
    console.log('App loaded')
    this.fetchData()
    // this.getIssues()
  },
  methods: {
    async fetchData () {
      const exhibitDataTemp = await d3.json('./map-data.json')
      this.exhibitData = exhibitDataTemp
      const visitDataTemp = await d3.json('./visitorsTest.json')
      this.visitData = visitDataTemp
      this.visitsPerHourData = this.visitsPerHour
    }
  },
  computed: {
    // Indexes exhibits by room
    roomToExhibit () {
      const roomToExhibit = d3
        .nest()
        .key(d => d.room)
        .entries(this.exhibitData)
      return roomToExhibit
    },
    // Displays and sorts rooms by their number
    allRooms () {
      const allRooms = this.roomToExhibit
        .map(exhibit => Number(exhibit.key))
      return allRooms.sort(function (a, b) {
        return a - b
      })
    },
    // Indexes exhibits by name
    exhibitToRoom () {
      const exhibitToRoom = d3
        .nest()
        .key(d => d.name)
        .entries(this.exhibitData)
      return exhibitToRoom
    },
    // Given the visits array, outputs an array of 24 elements representing
    // the number of visits for a given hour
    visitsPerHour () {
      let i = 0
      const visitsPerHour = []
      // console.log(_.get(this.visitDataProp, 'positions'))
      while (i < 24) {
        const visitorPerHourTemp = this.visitData
          .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
        visitsPerHour[i] = visitorPerHourTemp
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
    }
    // }
    // visitsPerRoomPerHour () {
    //   let i = 0
    //   const visitsPerHour = []
    //   // console.log(_.get(this.visitDataProp, 'positions'))
    //   while (i < 24) {
    //     const visitorPerHourTemp = this.visitData
    //       .filter(visit => Number(visit.positions[0].startTime.split(':')[0]) === i)
    //     visitsPerHour[i] = { 'key': visitorPerHourTemp.room, visitorPerHourTemp}
    //     i++
    //   }
    //   return visitsPerHour.map(vph => vph.length)
    // }
  }
}

</script>

<style scoped>

</style>
