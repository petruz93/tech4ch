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
      <h1><p align="center" v-if="attractionPowerOn">Attraction Power</p></h1>
      <BubbleChart
        v-if="!undefined && attractionPowerOn"
        :bubbleChartData=attractionPowerValues
        :bubbleChartCoordinates=poiCoordinates
        :bubbleChartLabels=attractionPowerKeys>
      </BubbleChart>
      <button
        v-if="holdingPowerOn"
        @click=changeStat
        class='button-css'>
        View Attraction Power
      </button>
      <h1><p align="center" v-if="holdingPowerOn">Holding Power</p></h1>
      <BubbleChart
        v-if="!undefined && holdingPowerOn"
        :bubbleChartData=holdingPowerValues
        :bubbleChartCoordinates=poiCoordinates
        :bubbleChartLabels=attractionPowerKeys>
      </BubbleChart>
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

</style>
