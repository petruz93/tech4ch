<template>
  <div>
    <h1>Bubble Chart</h1>
    <p align="center">
      <svg
        :width="width"
        :height="height"
        :style="{
          backgroundImage: `url(${museumMap})`
        }">
        <g>
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
        </g>
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
      required: true,
      default: { name: 'che divertimento!' }
    },
    visitorDataProp: {
      type: Array[Object],
      required: true,
      default: { name: 'ma popo troppo' }
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
  mounted () {
    console.log('BubbleChart loaded')
    // this.fetchData()
    this.renderChart()
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
    renderChart () {
      console.log()
      const r = d3
        .scaleLinear()
        .domain([0, Math.max(...this.calculateAttractionPower())])
        .range([0, 100])
      const svg = d3.select('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .style('background-image', `url(${this.museumMap})`)
      const output = svg
        .selectAll('circle')
        .data(this.exhibitData)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => r)
        .attr('fill', 'red')
        .attr('stroke.width', 100)
        .attr('stroke', 50)
        .on('click', this.onClick)
      return output
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
    exhibitVisits (name) {
      console.log('exhibitData', this.prepareExhibitData().length)
      console.log('visitData', this.prepareVisitorData())
      // console.log('visitDataPositions', this.visitorData[0].positions[1])
      // console.log('visitDataExihibit', this.visitorData.positions.exhibit)
      const visits = this.prepareVisitorData()
        .map(visitor =>
          visitor.positions.forEach(pos =>
            pos.exhibit === name ? 1 : 0)
            .reduce((count, exhibit) =>
              count + exhibit
            ))
      console.log('visits:', visits.results)
      return visits
    },
    calculateAttractionPower () {
      const visitorDataLength = this.visitorData.length
      console.log(this.exhibitVisits('EntranceReubenHecht'))
      return this.prepareExhibitData().map(element => this.exhibitVisits(element.name) / visitorDataLength)
    }
  }
}

</script>

<style scoped>

</style>
