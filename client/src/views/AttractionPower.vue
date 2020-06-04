<template>
  <div>
    <div class="bubbleChart">
      <span>Click on the button to change between Attraction and Holding Powers!</span><br><br>
      <button
        v-if="attractionPowerOn"
        @click=changeStat
        class='button-css'>
        View Holding Power
      </button>
      <h1 v-if="attractionPowerOn"><p align="center">
        Attraction Power</p></h1>
      <BubbleChart
        v-if="!undefined && attractionPowerOn"
        :bubbleChartData=attractionPowerValues
        :bubbleChartCoordinates=poiCoordinates
        :bubbleChartLabels=attractionPowerKeys>
      </BubbleChart>
      <p align="center" v-if="attractionPowerOn">Attraction Power is calculated by dividing the total times that all museum visitors passed by a relevant map coordinate by the total time visitors changed their position across all the visits. It measures how much a point of interest is relatively capable of capturing visitors interest.</p>
      <button
        v-if="holdingPowerOn"
        @click=changeStat
        class='button-css'>
        View Attraction Power
      </button>
      <h1 v-if="holdingPowerOn"><p align="center">Holding Power</p></h1>
      <BubbleChart
        v-if="!undefined && holdingPowerOn"
        :bubbleChartData=holdingPowerValues
        :bubbleChartCoordinates=poiCoordinates
        :bubbleChartLabels=attractionPowerKeys>
      </BubbleChart>
      <p align="center" v-if="holdingPowerOn">
      Holding Power is calculated by dividing the total time that all museum visitors remained stationed by a relevant map coordinate by the total time visitors spent inside the museum. It measures how much a point of interest is relatively capable of holding visitors interest.
      </p>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FetchDataUtils from '@/FetchDataUtils'

export default {
  name: 'AttractionPower',
  components: {
    BubbleChart: () => import('@/components/BubbleChart.vue')
  },
  data () {
    return {
      exhibitData: [],
      visitData: [],
      poiCoordinates: [],
      attractionPowerValuesData: [],
      attractionPowerKeysData: [],
      attractionPowerOn: true,
      holdingPowerOn: false
    }
  },
  created () {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const allData = await FetchDataUtils.getAllData()
        this.exhibitData = allData.mapData
        // set visitData
        const visitDataTemp = await allData.visitorsData
        this.visitData = visitDataTemp
        // set PoI coordinates
        Object.values(this.exhibitData)
          .forEach(v => this.poiCoordinates.push([Number(v.x), Number(v.y)]))
      } catch (error) {
        this.error = error.message
      }
    },
    changeStat () {
      this.attractionPowerOn = !this.attractionPowerOn
      this.holdingPowerOn = !this.holdingPowerOn
    },
    countVisitExhibitOccurrences (positionArray) {
      const result = {}
      if (positionArray instanceof Array) {
        positionArray.forEach(function (v) {
          const timeSpent = (parseInt(v.endTime.split(':')[2]) - parseInt(v.startTime.split(':')[2])) +
            (parseInt(v.endTime.split(':')[1]) * 60 - parseInt(v.startTime.split(':')[1]) * 60) +
            (parseInt(v.endTime.split(':')[0]) * 3600 - parseInt(v.startTime.split(':')[0]) * 3600)
          if (!result[v.exhibit]) {
            result[v.exhibit] = timeSpent
          } else {
            result[v.exhibit] = result[v.exhibit] + timeSpent
          }
        })
      }
      return result
    },
    countExhibitOccurrences (exhibitArray) {
      'use strict'
      const result = {}
      if (exhibitArray instanceof Array) { // Check if input is array.
        exhibitArray.forEach(function (v, i) {
          for (const e in v) {
            if (!result[e]) { // Initial object property creation.
              result[e] = 1 // Create an array for that property.
            } else { // Same occurrences found.
              result[e] = result[e] + 1 // Fill the array.
            }
          }
        })
        return result
      }
    },
    countExhibitVisitTime (exhibitArray) {
      'use strict'
      const result = {}
      if (exhibitArray instanceof Array) { // Check if input is array.
        exhibitArray.forEach(function (v, i) {
          for (const e in v) {
            if (!result[e]) { // Initial object p roperty creation.
              result[e] = v[e] // Create an array for that property.
            } else { // Same occurrences found.
              result[e] = result[e] + v[e] // Fill the array.
            }
          }
        })
        return result
      }
    }
  },
  computed: {
    exhibitVisits () {
      const visits = this.visitData
        .map(v => this.countVisitExhibitOccurrences(v.positions))
      return visits
    },
    totalExhibitVisits () {
      return this.countExhibitOccurrences(this.exhibitVisits)
    },
    attractionPower () {
      const totalVisits = this.exhibitVisits.length
      const attractionPowers = {}
      for (const e in this.totalExhibitVisits) {
        attractionPowers[e] = this.totalExhibitVisits[e] / totalVisits
      }
      return attractionPowers
    },
    attractionPowerValues () {
      return Object.values(this.attractionPower)
    },
    attractionPowerKeys () {
      return Object.keys(this.attractionPower)
    },
    holdingPowerValues () {
      const countExhibitVisitTime = this.countExhibitVisitTime(this.exhibitVisits)
      const countTotalExhibitVisitTime = Object.values(countExhibitVisitTime).reduce((acc, currValue) => acc + currValue)
      return Object.values(countExhibitVisitTime).map(v => v / countTotalExhibitVisitTime)
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
  width: 240px;
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
</style>
