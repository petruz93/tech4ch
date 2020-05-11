<template>
  <div>
    <h1>Bubble Chart</h1>
    {{ exhibitDataProp }}
    {{ renderChart }}
    <p align="center">
      <svg
        :width="width"
        :height="height"
        :style="{
          backgroundImage: `url(${museumMap})`
        }">
      <!-- <g>
        <circle
          v-for="(item, index) in exhibitData"
          :key="index"
          :cx="x"
          :cy="y"
          :r="r"
          fill="red"
          stroke.width="100"
          stroke="50"
          @click="onClick()"
          />
      </g> -->
      </svg>
    </p>
  </div>
</template>

<script>
// import * as d3 from 'd3'
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
    allData: {
      type: Array[Object],
      required: true,
      default: () => [{}]
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
    },
    exhibitVisits (name) {
      console.log('exhibitData', this.exhibitData.length)
      console.log('visitData', this.visitorData)
      console.log('visitDataPositions', this.visitorData[0].positions[1])
      console.log('visitDataExihibit', this.visitorData[0].positions[0].exhibit)
      const visits = this.visitorData
        .map(visitor =>
          visitor.positions.map(pos =>
            pos.exhibit === name ? 1 : 0)
            .reduce((count, exhibit) =>
              count + exhibit
            ))
      console.log('visits:', visits)
      return visits
    },
    calculateAttractionPower () {
      const visitorDataLength = this.visitorData.length
      console.log('attractionPower', this.exhibitData.map(element => this.exhibitVisits(element.name) / visitorDataLength))
      return this.exhibitData.map(element => this.exhibitVisits(element.name) / visitorDataLength)
    }
  },
  computed: {
    renderChart () {
      // const svg = d3.select('svg')
      //   .attr('width', this.width)
      //   .attr('height', this.height)
      //   .style('background-image', `url(${this.museumMap})`)
      // const output = svg
      //   .selectAll('circle')
      //   .data(this.exhibitData)
      //   .enter()
      //   .append('circle')
      //   .attr('cx', d => d.x)
      //   .attr('cy', d => d.y)
      //   .attr('r', d => r)
      //   .attr('fill', 'red')
      //   .attr('stroke.width', 100)
      //   .attr('stroke', 50)
      //   .on('click', this.onClick)
      const output = this.exhibitDataProp
      console.log('output', output)
      return output
    //   output.map((d, i) => {
    //     return {
    //       id: i + 1,
    //       r: d.scaleRadius(),
    //       cx: d.x,
    //       cy: d.y
    //     }
    //   })
    }
  }
}

</script>

<style scoped>

</style>
