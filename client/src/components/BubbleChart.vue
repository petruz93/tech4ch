<template>
  <div>
    <h1>Bubble Chart</h1>
    <p align="center">
      <svg :style="{
        backgroundImage: `url(${museumMap})`
        }">
      </svg>
    </p>
    {{ renderChart }}
  </div>
</template>

<script>
import * as d3 from 'd3'
import museumMap from '@/assets/museum_clean_map.jpg'

export default {
  name: 'BubbleChart',
  props: {
    exhibitData: {
      type: Array
    },
    visitorData: {
      type: Array
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
  methods: {
    onClick () {
      console.log('hey there')
    },
    exhibitVisits (name) {
      let count = 0
      // if (!this.visitorData.results) return 'no data'
      // if (!Array.isArray(this.visitorData.results)) return 'results are not array'
      console.log(this.visitorData)
      this.visitorData.forEach(visitor => {
        visitor.positions.forEach(pos => {
          if (pos.exhibit === name) count++
        })
      })
      return count
    },
    calculateAttractionPower () {
      const exhibitDataLength = this.exhibitData.length
      console.log(this.exhibitVisits('EntranceReubenHecht'))
      return this.exhibitData.map(element => this.exhibitVisits(element.name) / exhibitDataLength)
    }
  },
  computed: {
    // buildAxis () {
    //   const x = d3
    //     .scaleLinear()
    //     .domain([0, 100])
    //     .range([0, 1149])
    //   const y = d3
    //     .scaleLinear()
    //     .domain([0, 100])
    //     .range([0, 1149])
    //   const output = d3
    //     .select('svg')
    //     .append('g')
    //     .attr('transform', 'translate(50,50)')
    //     .call(d3.axisBottom(x))
    //     .call(d3.axisLeft(y))
    //   return output
    // },
    attractionPower () {
      return this.calculateAttractionPower()
    },
    renderChart () {
      const r = d3
        .scaleLinear()
        .domain([0, Math.max(this.attractionPower)])
        .range([0, 100])
      const svg = d3.select('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .style('background-image', `url(${this.museumMap})`)
      const output = svg
        // .append('img')
        // .attr('src', '@/assets/museum_clean_map.jpg')
        .selectAll('circle')
        .data(this.exhibitData)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => r)
        .attr('fill', 'red')
        .attr('stroke.width', 100)
        .attr('stroke', 50)
        .on('click', this.onClick)
      return output
    },
    packData () {
      const dataSet = d3
        .entries(this.exhibitData)
      return dataSet
    }
  }
}

</script>

<style scoped>

</style>
