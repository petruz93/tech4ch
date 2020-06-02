<template>
<div>
  <div class="bubbleChart">
    <button v:if="" @click=renderChart class='button-css'>Refresh</button>
  </div>
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
      baseWidth: 1140,
      baseHeight: 560,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      // margin: { top: 10, right: 20, bottom: 30, left: 50 },
      museumMap,
      hover: false
    }
  },
  created () {
    console.log('BubbleChart loaded')
  },
  mounted () {
    this.renderChart()
  },
  methods: {
    onClick () {
      console.log('hey there')
    },
    renderChart () {
      d3.selectAll('svg').remove()
      // append the svg object to the body of the page
      const svg = d3
        .select('.bubbleChart')
        .append('svg')
        // .attr('width', this.width + this.width + this.margin.left + this.margin.right)
        // .attr('height', this.height + this.margin.top + this.margin.bottom)
        // .attr('xlink:href', this.museumMap)
        .attr('v:style', `background-image: url(${this.museumMap})`)
        // .attr('v:style', 'background-size: contain')
        // .attr('v:style', 'background-repeat: no-repeat')
        .attr('viewBox', [0, 0, this.width, this.height])
        .attr('preserveAspectratio', 'xMinYMin')
        .append('g')
        .attr('transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')')

      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, Math.max(...this.bubbleChartCoordinates.map(v => v[0])) * 1.35])
        .range([this.margin.left, this.width - this.margin.right])

      // const xAxis = g => g
      //   .attr('transform', `translate(0,'${this.height - this.margin.bottom})`)
      //   .call(d3.axisBottom(x))

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, Math.max(...this.bubbleChartCoordinates.map(v => v[1])) * 1.35])
        .range([this.height - this.margin.bottom, this.margin.top])

      // const yAxis = g => g
      //   .attr('transform', `translate(${this.margin.left},0)`)
      //   .call(d3.axisLeft(y))

      // Add a scale for bubble size
      const z = d3.scaleLinear()
        .domain([0, Math.max(...this.bubbleChartData)])
        .range([0, 50])

      // Add dots
      svg.append('g')
        .selectAll('dot')
        .data(this.bubbleChartCoordinates)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[0] * 1.35))
        .attr('cy', d => y(d[1] * 1.35))
        .attr('r', (d, i) => z(this.bubbleChartData[i]))
        // .attr('@mouseover', this.hover = true)
        // .attr(':class', '{ active: hover }')
        // .attr('@mouseleave', this.hover = false)
        .style('fill', '#69b3a2')
        .style('opacity', '0.7')
        .attr('stroke', 'black')

      // svg.append('g')
      //   .call(xAxis)

      // svg.append('g')
      //   .call(yAxis)

      console.log('z', z)
      return svg.node()
    }
  },
  computed: {
    width () {
      return this.baseWidth - this.margin.left - this.margin.right
    },
    height () {
      return this.baseHeight - this.margin.top - this.margin.bottom
    }
  }
}

</script>

<style scoped>

div:bubbleChart {
  background-image: url(${this.museumMap});
}

.bubbleChart {
  margin: 0 auto;
  height: 20%;
  width: 30%;
  background-size: contain;
  background-repeat: no-repeat;
}

</style>
