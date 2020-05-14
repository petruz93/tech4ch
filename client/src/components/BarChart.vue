<template>
  <div>
    <h1>Bar Chart </h1>
        <div class="barChart" v-if="visitsPerHour!==[]">
        <svg>
          {{ this.renderChart }}
        </svg>
        </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

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
      chart: null,
      color: 'steelblue',
      height: 400,
      width: 500,
      margin: ({ top: 30, right: 0, bottom: 30, left: 40 })
    }
  },
  mounted () {
    // this.renderChart(this.visitsPerHour)
    // this.renderVisitsPerHourChart(this.visitsPerHour)
  },
  methods: {
  },
  computed: {
    visitsPerHourLength () {
      return this.visitsPerHour.length
    },
    renderChart () {
      const svg = d3
        .select('svg')
        .attr('viewBox', [0, 0, this.width, this.height])

      const x = d3.scaleBand()
        .domain(d3.range(this.visitsPerHour.length))
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.visitsPerHour)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

      svg.append('g')
        .attr('fill', this.color)
        .selectAll('rect')
        .data(this.visitsPerHour)
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('height', d => y(0) - y(d))
        .attr('width', x.bandwidth())

      const xAxis = g => g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x).ticks(i => i).tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y).ticks(d3.max(this.visitsPerHour)))
        // .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', -this.margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          // .attr('text-anchor', 'start')
          .text(d3.max(this.visitsPerHour)))

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)
      console.log(this.visitsPerHour)
      return svg.node()
    }
  }
}
</script>

<style scoped>
.barChart {
  margin: 0 auto;
  height: 80%;
  width: 80%
}
</style>
