<template>
  <div>
    <h1>Bar Chart </h1>
    <svg>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  name: 'BarChart',
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
        x: '430',
        y: '211',
        name: 'MuseumMotto',
        type: 'poi',
        room: '2',
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
    visitDataProp: {
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
      }]
    }
  },
  data () {
    return {
      chart: null,
      exhibitData: this.exhibitDataProp,
      visitData: this.visitDataProp
    }
  },
  mounted () {
    this.prepareData()
  },
  watch: {
    issues (val) {
      if (this.chart != null) this.chart.remove()
      this.renderChart(val)
    }
  },
  methods: {
    renderChart (issuesVal) {
      const margin = 60
      const svgWidth = 1000
      const svgHeight = 600
      const chartWidth = 1000 - 2 * margin
      const chartHeight = 600 - 2 * margin

      const svg = d3
        .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

      this.chart = svg
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

      const yScale = d3
        .scaleLinear()
        .range([chartHeight], 0)
        .domain([0, _.maxBy(issuesVal, 'issues').issues])
      this.chart
        .append('g')
        .call(d3.axisLeft(yScale).ticks(_.maxBy(issuesVal, 'issues').issues))

      const xScale = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(issuesVal.map(s => s.day))
        .padding(0.2)

      this.chart = svg.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
    },
    prepareData () {
      let i = 0
      const visitorPerHour = []
      console.log(Number(_.get(this.visitData, 'positions')))
      while (i < 24) {
        const visitorPerHourTemp = this.visitDataProp
          .filter(visit => Number(visit.positions[0].startTime.split(':')[0] === i))
        i++
        visitorPerHour[i] = visitorPerHourTemp
      }
      console.log(visitorPerHour)
      return visitorPerHour
    }
  },
  computed: {
    roomToExhibit () {
      // const jsonData = {
      //   room: this.exhibitDataProp.room,
      //   exhibit: this.exhibitDataProp.name
      // }
      // console.log('jsonData', jsonData)
      const roomToExhibit = d3
        .nest()
        .key(d => d.room)
        .entries(this.exhibitDataProp)
      return roomToExhibit
    },
    allRooms () {
      return this.roomToExhibit
        .map(exhibit => exhibit.key)
    },
    ExhibitToRoom () {
      const ExhibitToRoom = d3
        .nest()
        .key(d => d.name)
        .entries(this.exhibitDataProp)
      return ExhibitToRoom
    }
  }
}
</script>
