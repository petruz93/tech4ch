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
      margin: { top: 0, right: 20, bottom: 40, left: 5 },
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
        .attr('class', 'bubbleChart')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('v:style', `background-image: url(${this.museumMap})`)
        // .attr('xlink:href', this.museumMap)
        .attr('viewBox', [0, 0, this.width, this.height])
        // .attr('v:style', 'background-size: contain')
        // .attr('v:style', 'background-repeat: no-repeat')
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
        .range([this.margin.top, this.height - this.margin.bottom])

      // const yAxis = g => g
      //   .attr('transform', `translate(${this.margin.left},0)`)
      //   .call(d3.axisLeft(y))

      // Add a scale for bubble size
      const z = d3.scaleLinear()
        .domain([0, Math.max(...this.bubbleChartData)])
        .range([0, 50])

      const color = d3.scaleLinear()
        .domain([0, Math.max(...this.bubbleChartData)])
        .interpolate(d3.interpolateHsl)
        .range([d3.rgb('#FFFFCC'), d3.rgb('#CC0000')]) // yellow to red

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
        // .attr('v-if', (d, i) => `${this.bubbleChartData[i]}>500'`)
        .style('fill', (d, i) => color(this.bubbleChartData[i]))
        // .style('fill', 'red')
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
.bubbleChart {
  margin: 0 auto;
  height: 20%;
  width: 30%;
  background-size: contain;
  background-repeat: no-repeat;
}

.button-css {
  /*display: block;*/
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  /*padding: .6em 1.4em .5em .8em;*/
  padding: .6em .6em .6em .6em;
  width: 110px;
  /*max-width: 100%;*/
  box-sizing: border-box;
  margin: auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  /*background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),*/
  /*linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);*/
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
</style>
