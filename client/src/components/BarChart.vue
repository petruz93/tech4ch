<template>
  <div>
    <h1>Bar Chart </h1>
    <svg>
    {{ packChart }}
  </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'BarChart',
  props: ['barChartData'],
  data () {
    return {
      height: 1149,
      width: 560
    }
  },
  computed: {
    packChart () {
      var values = this.barChartData.ageGroups
      var x = d3.scaleOrdinal().range([this.width, 0])
      var y = d3.scaleLinear().range([this.height, 0])
      // function updateYScaleDomain (data) {
      //   var values = data.ageGroups
      //   y.domain([0, d3.max(values, d => d.population)])
      // }
      var bar = d3
        .selectAll('.bar')
        .data(values, d => d.ageGroup)
      bar.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.ageGroup))
        .attr('y', d => y(d.population))
      return bar
    },
    packData () {
      const dataset = d3
        // .nest()
        // .key(d => d.year)
        .entries(this.barChartData)
      return dataset
    }
  }
}
</script>
