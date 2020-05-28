<template>
  <div>
    <h1>Bar Chart </h1>
        <div class="barChart" v-if="stackedBarChartData!==[]">
        <svg>
          {{ this.renderChart }}
        </svg>
        </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'SNHBarChart',
  props: {
    stackedBarChartData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chart: null,
      margin: ({ top: 30, right: 10, bottom: 0, left: 30 })
    }
  },
  computed: {
    height () {
      return this.stackedBarChartData.length * 25 + this.margin.top + this.margin.bottom
    },
    renderChart () {
      const svg = d3.create('svg')
        .attr('viewBox', [0, 0, this.width, this.height])
        .style('overflow', 'visible')

      const series = svg.selectAll('.serie')
        .data(d3.stack()
          .offset(d3.stackOffsetExpand)
          .keys(this.stackedBarChartData.columns.slice(1))(this.stackedBarChartData))
        .enter().append('g')
        .attr('class', 'serie')
        .attr('fill', d => d.key)

      const x = d3.scaleLinear()
        .range([this.margin.left, this.width - this.margin.right])

      const y = d3.scaleBand()
        .domain(this.stackedBarChartData.map(d => d.name))
        .range([this.margin.top, this.height - this.margin.bottom])
        .padding(0.08)

      const color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(d3.schemeSpectral[series.length])
        .unknown('#ccc')

      const xAxis = g => g
        .attr('transform', `translate(0,${this.margin.top})`)
        .call(d3.axisTop(x).ticks(this.width / 100, '%'))
        .call(g => g.selectAll('.domain').remove())

      const yAxis = g => g
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call(g => g.selectAll('.domain').remove())

      const formatPercent = d3.format('.1%')

      const formatValue = x => isNaN(x) ? 'N/A' : x.toLocaleString('en')

      svg.append('g')
        .selectAll('g')
        .stackedBarChartData(series)
        .enter().append('g')
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .stackedBarChartData(d => d)
        .join('rect')
        .attr('x', d => x(d[0]))
        .attr('y', (d, i) => y(d.stackedBarChartData.name))
        .attr('width', d => x(d[1]) - x(d[0]))
        .attr('height', y.bandwidth())
        .append('title')
        .text(d => `${d.stackedBarChartData.name} ${d.key}
          ${formatPercent(d[1] - d[0])} (${formatValue(d.stackedBarChartData[d.key])})`)

      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      return svg.node()
    }
  }
}
</script>

<style scoped>

</style>
