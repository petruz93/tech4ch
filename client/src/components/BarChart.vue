<template>
  <div>
    <div class="barChart" v-if="barChartData!==[]">
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
    barChartData: {
      required: true,
      type: Array,
      default: () => []
    },
    barChartLabels: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      color: 'green',
      height: 600,
      width: 600,
      margin: ({ top: 30, right: 0, bottom: 30, left: 40 })
    }
  },
  mounted () {
    // this.renderChart(this.barChartData)
    // this.renderbarChartDataChart(this.barChartData)
  },
  methods: {
  },
  computed: {
    barChartDataLength () {
      return this.barChartData.length
    },
    renderChart () {
      d3.selectAll('svg').remove()
      const svg = d3
        .select('div.barChart')
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('viewBox', [0, 0, this.width, this.height])

      const x = d3.scaleBand()
        .domain(d3.range(this.barChartLabels.length))
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.2)

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.barChartData)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

      svg.append('g')
        .attr('fill', this.color)
        .selectAll('rect')
        .data(this.barChartData)
        .join('rect')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('height', d => y(0) - y(d))
        .attr('width', x.bandwidth())

      const xAxis = g => g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(x).ticks(i => i).tickFormat(i => this.barChartLabels[i]).tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y).ticks(d3.max(this.barChartData) / 10))
        // .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', -this.margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          // .attr('text-anchor', 'start')
          .text(d3.max(this.barChartData)))

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
.barChart {
  margin: 0 auto;
  height: 20%;
  width: 30%
}
</style>
