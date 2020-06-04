<template>
  <div class="barChart">
    <span>Click on the button to change between Visit/Hour and Visit/Room/Hour!</span><br><br>
    <button v-if="visitPerHourOn" @click=changeStat class='button-css'>Visit/Room/Hour</button>
    <button v-if="visitPerRoomPerHourOn" @click=changeStat class='button-css'>Visit/Hour</button><br>
      <h1 v-if="visitPerHourOn"><p align="center">
        Visit Per Hour</p></h1>
      <h1 v-if="visitPerRoomPerHourOn"><p align="center">
        Visit Per Room Per Hour</p></h1>
      <select v-if="visitPerRoomPerHourOn" @change=visitsPerSelectedRoom class='select-css'>
        <option></option>
        <option v-for='vprph in this.roomsList' :key='vprph' v-bind:value='vprph'>{{ vprph }}</option>
      </select>
      <BarChart
        v-if='visitsPerHourValues!==[] && visitPerHourOn'
        :barChartData=visitsPerHourValues
        :barChartLabels=visitsPerHourKeys
      />
      <BarChart v-if="visitPerRoomPerHourOn"
        :barChartData=visitsPerRoomPerHourValues
        :barChartLabels=visitsPerRoomPerHourKeys
      />
      <BarChart
        :barChartData=visitsPerRoomPerHourValues
        :barChartLabels=visitsPerRoomPerHourKeys
      />
  </div>
</template>

<script>
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
      visitData: [],
      visitsPerRoomPerHourValues: [],
      visitsPerRoomPerHourKeys: [],
      roomsList: [],
      visitPerHourOn: true,
      visitPerRoomPerHourOn: false
    }
  },
  async created () {
    console.log('App loaded')
    await this.fetchData()
    this.roomsList = this.setRoomsList
  },
  methods: {
    async fetchData () {
      try {
        const allData = await FetchDataUtils.getAllData()
        this.exhibitData = allData.mapData
        const visitDataTemp = allData.visitorsData
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
        positionArray.forEach(function (v) {
          if (typeof (self.exhibitData[v.exhibit]) !== 'undefined') {
            const room = self.exhibitData[v.exhibit].room
            if (!result[room]) {
              // console.log('room', room)
              result[room] = [v.startTime.split(':')[0]]
            } else {
              result[room].push(v.startTime.split(':')[0])
            }
          }
        })
      }
      return result
    },
    visitsPerSelectedRoom (room) {
      const visitsPerHour = {}
      console.log(room)
      const selectedRoom = room.target.options[room.target.options.selectedIndex].value
      for (const e in this.visitsPerRoomPerHour[selectedRoom]) {
        visitsPerHour[e] = this.visitsPerRoomPerHour[selectedRoom][e].size
      }
      console.log(Object.values(visitsPerHour))
      this.visitsPerRoomPerHourValues = Object.values(visitsPerHour)
      this.visitsPerRoomPerHourKeys = Object.keys(visitsPerHour)
    },
    changeStat () {
      this.visitPerHourOn = !this.visitPerHourOn
      this.visitPerRoomPerHourOn = !this.visitPerRoomPerHourOn
    }
  },
  computed: {
    // Given the visits array, outputs an array of 24 elements representing
    // the number of visits for a given hour
    visitsPerHour () {
      let i = 0
      const visitsPerHour = {}
      this.visitData.forEach(function (v) {
        const visitStartHour = Number(v.startVisit.split(':')[0])
        const visitEndHour = Number(v.endVisit.split(':')[0])
        for (i = visitStartHour; i <= visitEndHour; i++) {
          if (!visitsPerHour[i]) {
            visitsPerHour[i] = 1
          } else {
            visitsPerHour[i]++
          }
        }
      })
      return visitsPerHour
    },
    visitsPerRoomPerHour () {
      const self = this
      const visitsPerRoomPerHour = {}
      this.visitData.forEach(function (v) {
        v.positions.forEach(function (p) {
          const visitStartHour = Number(p.startTime.split(':')[0])
          const exhibit = p.exhibit
          if (typeof (self.exhibitData[exhibit]) !== 'undefined') {
            const room = self.exhibitData[exhibit].room
            if (!visitsPerRoomPerHour[room]) {
              visitsPerRoomPerHour[room] = {}
            }
            if (!visitsPerRoomPerHour[room][visitStartHour]) {
              visitsPerRoomPerHour[room][visitStartHour] = new Set()
            }
            visitsPerRoomPerHour[room][visitStartHour].add(v.visitorID)
          }
        })
      })
      return visitsPerRoomPerHour
    },
    visitsPerHourValues () {
      return Object.values(this.visitsPerHour)
    },
    visitsPerHourKeys () {
      return Object.keys(this.visitsPerHour)
    },
    setRoomsList () {
      const roomSet = new Set()
      for (const e in this.exhibitData) {
        roomSet.add(this.exhibitData[e].room)
      }
      return Array.from(roomSet).sort()
    }
  }
}

</script>

<style scoped>

</style>
