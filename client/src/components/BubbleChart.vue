<template>
  <div>
    <h1>Bubble Chart</h1>
    {{ exhibitDataProp }}
    {{ renderChart }}
    <p align='center'>
      <svg
        :width="width"
        :height="height"
        :style="{
          backgroundImage: `url(${museumMap})`
        }"
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
    exhibitDataProp: {
      type: Array[Object],
      required: false,
      default: () => [{}]
    },
    visitorDataProp: {
      type: Array[Object],
      required: false,
      default: () => [{}]
    },
    bubbleChartData: {
      type: Array[Object],
      required: true,
      default: () => [{}]
    },
    bubbleChartCoordinates: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      // dataSet,
      msg: 'Here is the BubbleChart',
      width: 1149,
      height: 560,
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
      const radius = d3.scaleSqrt(
        [0, d3.quantile([...this.bubbleChartData.values()].sort(d3.ascending), 0.985)],
        [0, 15]
      )

      // const path = d3.geoPath();

      // const us = FileAttachment("counties-albers-10m.json").json();

      const svg = d3.create('svg').attr('viewBox', [0, 0, 975, 610])

      // svg
      //   .append("path")
      //   .datum(topojson.feature(us, us.objects.nation))
      //   .attr("fill", "#ccc")
      //   .attr("d", path);

      // svg
      //   .append("path")
      //   .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      //   .attr("fill", "none")
      //   .attr("stroke", "white")
      //   .attr("stroke-linejoin", "round")
      //   .attr("d", path);

      const legend = svg
        .append('g')
        .attr('fill', '#777')
        .attr('transform', 'translate(925,608)')
        .attr('text-anchor', 'middle')
        .style('font', '10px sans-serif')
        .selectAll('g')
        .data([1e6, 5e6, 1e7])
        .join('g')

      legend
        .append('circle')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('cy', d => -radius(d))
        .attr('r', radius)

      legend
        .append('text')
        .attr('y', d => -2 * radius(d))
        .attr('dy', '1.3em')
        .text(d3.format('.1s'))

      svg
        .append('g')
        .attr('fill', 'brown')
        .attr('fill-opacity', 0.5)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .selectAll('circle')
        .data(this.bubbleChartData)
        .join('circle')
        .attr('transform', d => `translate(${this.bubbleChartCoordinates.x},${this.bubbleChartCoordinates.y})`)
        .attr('r', d => radius(d.value))
        .append('title')
        .text(
          d => `${d.properties.name}`
        )
      return svg.node()
    }
  }
}
</script>

<style scoped>
</style>
