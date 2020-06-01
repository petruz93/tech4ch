<template>
  <div>
    <h1>Bubble Chart</h1>
    {{ exhibitDataProp }}
    {{ renderChart }}
    <p align='center'>
      <svg
        :width='width'
        :height='height'
        :style='{
          backgroundImage: `url(${museumMap})`
        }'
      >
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
    bubbleChartData: {
      type: Array[Object],
      required: true,
      default: () => [{}]
    },
    bubbleChartCoordinates: {
      type: Array,
      required: true,
      default: () => []
    },
    bubbleChartLabels: {
      type: Array,
      required: true,
      default: () => [{}]
    }
  },
  data () {
    return {
      width: 500 - this.margin.left - this.margin.right,
      height: 420 - this.margin.top - this.margin.bottom,
      margin: { top: 10, right: 20, bottom: 30, left: 50 },
      museumMap
    }
  },
  created () {
    console.log('BubbleChart loaded')
  },
  methods: {
    onClick () {
      console.log('hey there')
    }
  },
  computed: {
    renderChart () {
      // append the svg object to the body of the page
      var svg = d3
        .select('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')')

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 10000])
        .range([0, this.width])
      svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x))

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([35, 90])
        .range([this.height, 0])
      svg.append('g')
        .call(d3.axisLeft(y))

      // Add a scale for bubble size
      var z = d3.scaleLinear()
        .domain([200000, 1310000000])
        .range([1, 40])

      // Add dots
      svg.append('g')
        .selectAll('dot')
        .data(this.bubbleChartData)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return x(d) })
        .attr('cy', function (d) { return y(d) })
        .attr('r', function (d) { return z(d) })
        .style('fill', '#69b3a2')
        .style('opacity', '0.7')
        .attr('stroke', 'black')

      return svg.node()
    }
  }
}

</script>

<style scoped>
</style>
