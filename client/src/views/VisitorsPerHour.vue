<template>
  <div>
    <h1>Visitors Per Hour Charts</h1>
    <!-- <form action="#" @submit.prevent="getIssues">
      <div class="form-group">
        <input
          type="text"
          placeholder="owner/repo Name"
          v-model="repository"
          class="col-md-2 col-md-offset-5"
        >
      </div>
    </form> -->
    <BarChart
      :exhibitDataProp=loadExhibitData
      :visitDataProp=loadVisitData
      />
  </div>
</template>

<script>
// @ is an alias to /src
// import moment from 'moment'
// import axios from 'axios'
import * as d3 from 'd3'
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'VisitorsPerHour',
  components: {
    BarChart
  },
  data () {
    return {
      loadExhibitData: [],
      loadVisitData: []
    }
  },
  mounted () {
    console.log('App loaded')
    this.fetchData()
    // this.getIssues()
  },
  methods: {
    async fetchData () {
      const exhibitDataTemp = await d3.json('./map-data.json')
      this.loadExhibitData = exhibitDataTemp
      const visitDataTemp = await d3.json('./visitorsTest.json')
      this.loadVisitData = visitDataTemp
    }
    // getIssues () {
    //   this.startDate = '2020-04-20'
    //   // moment()
    //   // .subtract(6, 'days')
    //   // .format('YYYY-MM-DD')
    //   console.log('startDate', this.startDate)
    //   axios
    //     .get(`https://api.github.com/search/issues?q=repo:${this.repository}+is:issues+is:open+created:>=${this.startDate}`,
    //       { params: { per_page: 100 } }
    //     )
    //     .then(response => {
    //       const payload = this.getDateRange()

    //       response.data.items.forEach(item => {
    //         const key = moment(item.created_at).format('MMM Do YY')
    //         const obj = payload.filter(o => o.day === key)[0]
    //         obj.issues += 1
    //       })
    //       this.issues = payload
    //       console.log(this.issues)
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    // },
    // getDateRange () {
    //   const startDate = '2020-04-20'
    //   // moment().subtract(6, 'days')
    //   const endDate = moment()
    //   const dates = []

    //   while (startDate.isSameOrBefore(endDate)) {
    //     dates.push({
    //       day: startDate.format('MMM Do YY'),
    //       issues: 0
    //     })

    //     startDate.add(1, 'days')
    //   }

    //   return dates
    // }
  }
}

</script>

<style scoped>

</style>
