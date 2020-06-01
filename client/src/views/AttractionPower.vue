<template>
  <div>
    <BubbleChart
      v-if="!undefined"
      :bubbleChartData=attractionPowerValues
      :bubbleChartCoordinates=PoICoordinates
      :bubbleChartLabels=attractionPowerKeys
      />
      <BarChart
        v-if="!undefined"
        :barChartData=attractionPowerValues
        :barChartLabels=attractionPowerKeys
      />
<!-- allData="loadAllData" -->
  </div>
</template>

<script>
// @ is an alias to /src
import FetchDataUtils from '@/FetchDataUtils'

export default {
  name: 'AttractionPower',
  components: {
    BubbleChart: () => import('@/components/BubbleChart.vue'),
    BarChart: () => import('@/components/BarChart.vue')
  },
  data () {
    return {
      loadExhibitData: [],
      loadVisitorData: [],
      exhibitData: [],
      visitData: []
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
    },
    countVisitExhibitOccurrences (positionArray) {
      const result = {}
      if (positionArray instanceof Array) { // Check if input is array.
        positionArray.forEach(function (v) {
          // const startTime = v.startTime
          // const endTime = v.endTime
          // console.log((parseInt(v.endTime.split(':')[2]) - parseInt(v.startTime.split(':')[2])) +
          //   (parseInt(v.endTime.split(':')[1]) * 60 - parseInt(v.startTime.split(':')[1]) * 60) +
          //   (parseInt(v.endTime.split(':')[0]) * 3600 - parseInt(v.startTime.split(':')[0]) * 3600))
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
    }
    // async fetchData () {
    //   const exhibitDataTemp = await d3.json('./map-data.json')
    //   this.loadExhibitData = exhibitDataTemp
    //   this.exhibitData = this.prepareExhibitData
    //   const visitorDataTemp = await d3.json('./visitorsTest.json')
    //   this.loadVisitorData = visitorDataTemp
    // }
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
    }
    // holdingPower () {
    //   this.visitData.forEach(function (v) {
    //     positionArray.forEach()
    //     position.endTime.split(':')[2] - position.startTime.split(':')[2] +
    //     position.endTime.split(':')[1]*60 - position.startTime.split(':')[1]*60 +
    //     position.endTime.split(':')[0]*3600 - position.startTime.split(':')[0]*3600
    //   })
  }
}

</script>

<style scoped>

</style>
