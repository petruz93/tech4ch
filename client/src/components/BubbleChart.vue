<template>
  <div>
    <h1>Bubble Chart</h1>
    <p align="center">
      <svg :style="{
        backgroundImage: `url(${museumMap})`,
        width:museuMapWidth,
        height:museumMapHeight
        }">
      </svg>
    </p>
    {{ buildAxis }}
    {{ renderChart }}
  </div>
</template>

<script>
import * as d3 from 'd3'
import museumMap from '@/assets/museum_clean_map.jpg'

export default {
  name: 'BubbleChart',
  props: ['dataset'],
  data () {
    return {
      // dataSet,
      msg: 'Here is the BubbleChart',
      width: 1149,
      height: 560,
      museumMap,
      museumMapWidth: '150%',
      museuMapHeight: '150%'
    }
  },
  methods: {
    onClick () {
      console.log('hey there')
    }
  },
  computed: {
    buildAxis () {
      const x = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, 1149])
      const y = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, 1149])
      const output = d3
        .select('svg')
        .append('g')
        .attr('transform', 'translate(50,50)')
        .call(d3.axisBottom(x))
        .call(d3.axisLeft(y))
      return output
    },
    renderChart () {
      const svg = d3.select('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .style('background-image', `url(${this.museumMap})`)
      const output = svg
        // .append('img')
        // .attr('src', '@/assets/museum_clean_map.jpg')
        .selectAll('circle')
        .data(this.dataset)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.z)
        .attr('fill', '#000')
        .attr('stroke.width', 100)
        .attr('stroke', 50)
        .on('click', this.onClick)
      return output
    },
    packData () {
      const dataSet = d3
        .entries(this.dataset)
      return dataSet
    }
  }
}

</script>

<style scoped>

</style>
