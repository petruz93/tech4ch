<template>
  <div>
    <h1>Bar Chart </h1>
      <div v-if="visitsPerHour!==[]">
        {{ visitsPerHour }}
        {{ renderVisitsPerHourChart(visitsPerHour) }}
      <svg>
      </svg>
      </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  name: 'BarChart',
  props: {
    visitsPerHour: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.renderVisitsPerHourChart(this.visitsPerHour)
  },
  watch: {
    visitsPerHour (val) {
      if (this.chart != null) this.chart.remove()
      this.renderVisitsPerHourChart(val)
    }
  },
  methods: {
    renderVisitsPerHourChart (visitsPerHour) {
      const margin = 60
      const svgWidth = 1000
      const svgHeight = 600
      const chartWidth = 1000 - 2 * margin
      const chartHeight = 600 - 2 * margin

      const svg = d3
        .select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

      let chart = svg
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

      const yScale = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, _.max(visitsPerHour)])
      console.log('max', visitsPerHour)
      chart
        .append('g')
        .call(d3.axisLeft(yScale).ticks(_.max(visitsPerHour)))

      const xScale = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain([0, visitsPerHour.length])
        .padding(0.2)

      chart = svg.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale).ticks(visitsPerHour.length))

      const barGroups = chart
        .selectAll('rect')
        .data(visitsPerHour)
        .enter()
      visitsPerHour.forEach(function () {
        barGroups
          .append('rect')
          .attr('class', 'bar')
          .attr('x', g => xScale(1))
          .attr('y', g => yScale(10))
          .attr('height', g => chartHeight - yScale(0))
          .attr('width', xScale.bandwidth())
      })
    }
  },
  computed: {
  }
}
</script>
