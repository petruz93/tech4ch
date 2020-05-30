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
  name: 'StackedBarChart',
  props: {
    stackedBarChartData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chart: null,
      width: 900,
      height: 500,
      margin: ({ top: 10, right: 0, bottom: 30, left: 30 })
    }
  },
  computed: {
    colors () {
      const colors = d3.scaleOrdinal(
      data.categories,
      d3.schemeGnBu[9].slice(3))
    },
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
    },
  chart() {

  const svg = d3.create('svg')
      .attr('width', 900)
      .attr('height', 500)

  // Pass our data to the stack to generate the layer positions
  const chartData = stack( data ) 
  
  const groups = svg.append('g')
    // Each layer of the stack goes in a group
    // the group contains that layer for all countries
    .selectAll('g')
    .data( chartData )
    .join('g')
      // rects in the same layer will all have the same color, so we can put it on the group
      // we can use the key on the layer's array to set the color
      .style('fill', (d,i) => colors(d.key))
  
  groups.selectAll('rect')
    // Now we place the rects, which are the children of the layer array
    .data(d => d)
    .join('rect')
      .attr('x', d => xScale(d.data.location))
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth())

  svg.append('g')
    .attr('transform', `translate(0,${ height - margin.bottom })`)
    .call(xAxis)
  
  svg.append('g')
    .attr('transform', `translate(${ margin.left },0)`)
    .call(yAxis)
    .select('.domain').remove()

  return svg.node()
  
}
  }
}
</script>

<style scoped>

</style>
