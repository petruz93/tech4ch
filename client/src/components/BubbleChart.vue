<template>
  <div>
    <h1>Bubble Chart</h1>
    {{ renderChart }}
    <p align="center">
      <svg
        :width="width"
        :height="height"
        :style="{
          backgroundImage: `url(${museumMap})`
        }">
      <!-- <g>
        <circle
          v-for="(item, index) in exhibitData"
          :key="index"
          :cx="x"
          :cy="y"
          :r="r"
          fill="red"
          stroke.width="100"
          stroke="50"
          @click="onClick()"
          />
      </g> -->
      </svg>
    </p>
  </div>
</template>

<script>
import * as d3 from 'd3'
import museumMap from '@/assets/museum_clean_map.jpg'

export default {
  name: 'BubbleChart',
  props: {
    exhibitDataProp: {
      type: Array[Object],
      required: false,
      default: () => [{
        x: '640',
        y: '383',
        name: 'EntranceReubenHecht',
        type: 'poi',
        room: '1',
        backName: 'Exit'
      },
      {
        x: '566',
        y: '383',
        name: 'SymbolsJewishMenorah',
        type: 'poi',
        room: '1',
        backName: ''
      },
      {
        x: '506',
        y: '383',
        name: 'PersianCult',
        type: 'poi',
        room: '1',
        backName: ''
      }]
    },
    visitorDataProp: {
      type: Array[Object],
      required: false,
      default: () => [{
        visitorID: '201',
        groupID: '149',
        positions: [
          {
            startTime: '14:07:37',
            endTime: '14:10:28',
            exhibit: 'JerusalemPhoto'
          },
          {
            startTime: '14:10:39',
            endTime: '14:12:14',
            exhibit: 'MaterialCultures'
          },
          {
            startTime: '14:12:14',
            endTime: '14:12:23',
            exhibit: 'Phoenicians'
          }
        ]
      },
      {
        visitorID: '202',
        groupID: '149',
        positions: [
          {
            startTime: '14:07:37',
            endTime: '14:10:28',
            exhibit: 'EntranceReubenHecht'
          },
          {
            startTime: '14:10:39',
            endTime: '14:12:14',
            exhibit: 'SymbolsJewishMenorah'
          },
          {
            startTime: '14:12:14',
            endTime: '14:12:23',
            exhibit: 'PersianCult'
          }
        ]
      }
      ]
    },
    allData: {
      type: Array[Object],
      required: true,
      default: () => [{}]
    }
  },
  data () {
    return {
      // dataSet,
      msg: 'Here is the BubbleChart',
      width: 1149,
      height: 560,
      museumMap,
      exhibitData: this.exhibitDataProp,
      visitorData: this.visitorDataProp
    }
  },
  created () {
    console.log('BubbleChart loaded')
    // this.fetchData()
    // this.renderChart()
  },
  methods: {
    onClick () {
      console.log('hey there')
    },
    // async fetchData () {
    //   const exhibitDataTemp = await d3.json('@/map-data.json')
    //   console.log('exhibitDataTemp', exhibitDataTemp)
    //   this.exhibitData = exhibitDataTemp
    //   const visitorDataTemp = await d3.json('@/visitorsTest.json')
    //   this.visitorData = visitorDataTemp
    // },
    exhibitVisits (name) {
      console.log('exhibitData', this.exhibitData.length)
      console.log('visitData', this.visitorData)
      console.log('visitDataPositions', this.visitorData[0].positions[1])
      console.log('visitDataExihibit', this.visitorData[0].positions[0].exhibit)
      const visits = this.visitorData
        .map(visitor =>
          visitor.positions.map(pos =>
            pos.exhibit === name ? 1 : 0)
            .reduce((count, exhibit) =>
              count + exhibit
            ))
      console.log('visits:', visits)
      return visits
    },
    calculateAttractionPower () {
      const visitorDataLength = this.visitorData.length
      console.log('attractionPower', this.exhibitData.map(element => this.exhibitVisits(element.name) / visitorDataLength))
      return this.exhibitData.map(element => this.exhibitVisits(element.name) / visitorDataLength)
    }
  },
  computed: {
    prepareVisitorData () {
      const visitorDataSet = d3
        .entries(this.visitorData)
      const allVisitors = { id: 'visitorData', values: visitorDataSet }
      return allVisitors
    },
    prepareExhibitData () {
      const exhibitDataSet = d3
        .entries(this.exhibitData)
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
    renderChart () {
      // const svg = d3.select('svg')
      //   .attr('width', this.width)
      //   .attr('height', this.height)
      //   .style('background-image', `url(${this.museumMap})`)
      // const output = svg
      //   .selectAll('circle')
      //   .data(this.exhibitData)
      //   .enter()
      //   .append('circle')
      //   .attr('cx', d => d.x)
      //   .attr('cy', d => d.y)
      //   .attr('r', d => r)
      //   .attr('fill', 'red')
      //   .attr('stroke.width', 100)
      //   .attr('stroke', 50)
      //   .on('click', this.onClick)
      const output = this.prepareExhibitData.values()
      console.log('output', output)
      return output.map((d, i) => {
        return {
          id: i + 1,
          r: d.scaleRadius(),
          cx: d.x,
          cy: d.y
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
