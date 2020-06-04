<template>
  <div class="barChart">
    <span>Click on the button to change between Visit/Hour and Visit/Room/Hour!</span><br><br>
    <button v-if="visitPerHourOn" @click=changeStat class='button-css'>Visit/Room/Hour</button>
    <button v-if="visitPerRoomPerHourOn" @click=changeStat class='button-css'>Visit/Hour</button>
    <br>
    <h1 v-if="visitPerHourOn"><p align="center">
      Visit Per Hour</p></h1>
    <select v-if="visitPerRoomPerHourOn" @change=visitsPerSelectedRoom class='select-css'>
      <option></option>
      <option v-for='vprph in this.roomsList' :key='vprph' v-bind:value='vprph'>{{ vprph }}</option>
    </select>
    <BarChart
      v-if='visitsPerHourValues!==[] && visitPerHourOn'
      :barChartData=visitsPerHourValues
      :barChartLabels=visitsPerHourKeys
    />
    <h1 v-if="visitPerRoomPerHourOn"><p align="center">
      Visit Per Room Per Hour</p></h1>
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
.button-css {
  /*display: block;*/
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  /*padding: .6em 1.4em .5em .8em;*/
  padding: .6em .6em .6em .6em;
  width: 170px;
  /*max-width: 100%;*/
  box-sizing: border-box;
  margin: auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  /*background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),*/
  /*linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);*/
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 80px;
  /*max-width: 100%;*/
  box-sizing: border-box;
  margin: auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight:normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
  background-position: left .7em top 50%, 0 0;
  padding: .6em .8em .5em 1.4em;
}

/* Disabled styles */
.select-css:disabled, .select-css[aria-disabled=true] {
  color: graytext;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
}
.select-css:disabled:hover, .select-css[aria-disabled=true] {
  border-color: #aaa;
}
</style>
