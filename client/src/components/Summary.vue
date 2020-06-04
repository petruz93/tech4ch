<template>
  <div>
    <p>{{ this.error }}</p>
    <button @click=viewSummary class='button-css'>View summary!</button>
    <p>Visitors</p>
    <p>- <span v-for='visitor in this.showedVisitors' v-bind:key='visitor'> - {{ visitor }} - </span> -</p>
    <div v-if='Object.keys(this.groupSummary).length > 0'>
      <table border='1'>
        <tr>
          <th colspan='3'>Group View</th>
        </tr>
        <tr>
          <th colspan='3'>Average time spent in Museum</th>
        </tr>
        <tr>
          <td colspan='3'>{{ this.groupSummary.TimeSpentInMuseum }}</td>
        </tr>
        <tr>
          <th colspan='3'>Average Point of Interests</th>
        </tr>
        <tr>
          <th colspan='2'>PoI Name</th>
          <th>Time Spent</th>
        </tr>
        <tr v-for='(time, PoIName) in this.groupSummary.PoI' v-bind:key="PoIName + 'PoI Group'">
          <td colspan='2'>{{ PoIName }}</td>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <th colspan='3'>AveragePresentations</th>
        </tr>
        <tr>
          <th colspan='2'>Presentation Name</th>
          <th>Time Spent</th>
        </tr>
        <tr v-for='(time, PresentationName) in this.groupSummary.Presentations' v-bind:key="PresentationName + 'Presentation Group'">
          <td colspan='2'>{{ PresentationName }}</td>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <th colspan='3'>Average Achievement</th>
        </tr>
        <tr>
          <th>Stay more then average</th>
          <th>Watched more then average presentations</th>
          <th>Number of presentations watched entirely</th>
        </tr>
        <tr>
          <td>
            <img v-if='this.groupSummary.Enjoy.stay' src='thumbs-up.png' width='50' height='50' alt='visitor stay more then average'>
            <img v-else src='thumbs-down.png' width='50' height='50' alt='visitor do not stay more then average'>
          </td>
          <td>
            <img v-if='this.groupSummary.Enjoy.moreThenAverage' src='thumbs-up.png' width='50' height='50' alt='visitor stay more then average'>
            <img v-else src='thumbs-down.png' width='50' height='50' alt='visitor do not stay more then average'>
          </td>
          <td class='finished_pres'>{{ this.groupSummary.Enjoy.numberOfPresentationsFinished }}</td>
        </tr>
      </table>
      <br>
      <br>
      <br>
    </div>
    <div v-for='(statistics, visitorID) in this.visitorsSummary' v-bind:key="visitorID + 'visitor'">
      <table border='1'>
        <tr>
          <th colspan='3'>Visitor {{ visitorID }}</th>
        </tr>
        <tr>
          <th colspan='3'>Time spent in Museum</th>
        </tr>
        <tr>
          <td colspan='3'>{{ statistics.TimeSpentInMuseum }}</td>
        </tr>
        <tr>
          <th colspan='3'>Point of Interests</th>
        </tr>
        <tr>
          <th colspan='2'>PoI Name</th>
          <th>Time Spent</th>
        </tr>
        <tr v-for='(time, PoIName) in statistics.PoI' v-bind:key="PoIName + 'PoI' + visitorID">
          <td colspan='2'>{{ PoIName }}</td>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <th colspan='3'>Presentations</th>
        </tr>
        <tr>
          <th colspan='2'>Presentation Name</th>
          <th>Time Spent</th>
        </tr>
        <tr v-for='(time, PresentationName) in statistics.Presentations' v-bind:key="PresentationName + 'Presentation' + visitorID">
          <td colspan='2'>{{ PresentationName }}</td>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <th colspan='3'>Achievement</th>
        </tr>
        <tr>
          <th>Stood more than average</th>
          <th>Watched more than average presentations</th>
          <th>Number of presentations watched entirely</th>
        </tr>
        <tr>
          <td>
            <img v-if='statistics.Enjoy.stay' src='thumbs-up.png' width='50' height='50' alt='visitor stay more then average'>
            <img v-else src='thumbs-down.png' width='50' height='50' alt='visitor do not stay more then average'>
          </td>
          <td>
            <img v-if='statistics.Enjoy.moreThenAverage' src='thumbs-up.png' width='50' height='50' alt='visitor stay more then average'>
            <img v-else src='thumbs-down.png' width='50' height='50' alt='visitor do not stay more then average'>
          </td>
          <td class='finished_pres'>{{ statistics.Enjoy.numberOfPresentationsFinished }}</td>
        </tr>
      </table>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  data () {
    return {
      timeSpentInPoI: {},
      presentations: {},
      showedVisitors: [],
      visitorsSummary: {},
      groupSummary: {},
      error: ''
    }
  },
  props: {
    visitors: Array,
    visitorsData: Array,
    avgPresentationWatched: Number,
    avgTimeInMuseum: String
  },
  methods: {
    hmsToSeconds: function (hmsTime) {
      const p = hmsTime.split(':')
      let s = 0
      let m = 1
      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
      }
      return s
    },
    secondsToHMS: function (time) {
      // console.log(time)
      return new Date(time * 1000).toISOString().substr(11, 8)
    },
    getVisitTime: function (visit) {
      try {
        const startVisit = visit.startVisit
        const endVisit = visit.endVisit
        return this.secondsToHMS(+this.hmsToSeconds(endVisit) - +this.hmsToSeconds(startVisit))
      } catch (e) {
        const err = 'Error with visitor ' + visit.visitorID + '\n' + e
        this.error = err
        console.log(err)
        return 0
      }
    },
    getTimeSpent: function (visitorsData) {
      const timeSpent = {}
      for (const position of visitorsData) {
        if (!isNaN(timeSpent[position.exhibit])) {
          timeSpent[position.exhibit] = Number(timeSpent[position.exhibit]) +
            +this.hmsToSeconds(position.endTime) - +this.hmsToSeconds(position.startTime)
        } else {
          timeSpent[position.exhibit] = +this.hmsToSeconds(position.endTime.toString()) -
            +this.hmsToSeconds(position.startTime.toString())
        }
      }
      for (const x in timeSpent) {
        timeSpent[x] = this.secondsToHMS(timeSpent[x])
      }
      return timeSpent
    },
    setPoISpentTime: function (visitor) {
      const timeSpentInPoI = this.getTimeSpent(visitor.positions)
      this.timeSpentInPoI[visitor.visitorID] = timeSpentInPoI
      this.visitorsSummary[visitor.visitorID].PoI = timeSpentInPoI
    },
    setPresentationsSpentTime: function (visitor) {
      const timeSpentInPresentations = this.getTimeSpent(visitor.presentations)
      this.presentations[visitor.visitorID] = timeSpentInPresentations
      this.visitorsSummary[visitor.visitorID].Presentations = timeSpentInPresentations
    },
    setAchievements: function (visitor) {
      const presentations = visitor.presentations
      // avg visit
      this.visitorsSummary[visitor.visitorID].Enjoy.stayRaw = this.hmsToSeconds(this.getVisitTime(visitor))
      this.visitorsSummary[visitor.visitorID].Enjoy.stay = this.hmsToSeconds(this.getVisitTime(visitor)) > this.hmsToSeconds(this.avgTimeInMuseum)
      // avg presentations
      let presentationsWatched = presentations.map(presentation => presentation.exhibit)
      presentationsWatched = presentationsWatched
        .filter((groupElement, groupIndex) => presentationsWatched.indexOf(groupElement) === groupIndex)
      const numberOfPresentationsWatched = presentationsWatched.length
      this.visitorsSummary[visitor.visitorID].Enjoy.moreThenAverageRaw = +numberOfPresentationsWatched
      this.visitorsSummary[visitor.visitorID].Enjoy.moreThenAverage = +numberOfPresentationsWatched > this.avgPresentationWatched
      // presentations viewed entirely
      const wellEndedPresentations = presentations
        .filter(presentation => presentation.ended === 'System')
        .map(presentation => presentation.exhibit)
      this.visitorsSummary[visitor.visitorID].Enjoy.numberOfPresentationsFinished = wellEndedPresentations
        .filter((groupElement, groupIndex) => wellEndedPresentations.indexOf(groupElement) === groupIndex).length
    },
    viewSummary: function () {
      this.showedVisitors = this.visitors
      this.timeSpentInPoI = {}
      this.presentations = {}
      this.visitorsSummary = {}
      this.groupSummary = {}
      for (const visitor of this.visitorsData) {
        this.visitorsSummary[visitor.visitorID] = {
          TimeSpentInMuseum: this.getVisitTime(visitor),
          PoI: {},
          Presentations: {},
          Enjoy: {}
        }
        this.setPoISpentTime(visitor)
        this.setPresentationsSpentTime(visitor)
        this.setAchievements(visitor)
      }
      if (this.visitors.length > 1) {
        this.groupSummary = {
          TimeSpentInMuseum: '',
          PoI: {},
          Presentations: {},
          Enjoy: {}
        }
        this.setGroupView(this.visitors.length)
      }
    },
    setGroupView: function (visitorsCounter) {
      let visitCounter = 0
      const PoICounter = {}
      const PresentationCounter = {}
      let stay = 0
      let avgPres = 0
      let presWatched = 0
      for (const visitor in this.visitorsSummary) {
        const visitorData = this.visitorsSummary[visitor]
        visitCounter += this.hmsToSeconds(visitorData.TimeSpentInMuseum)
        for (const PoI in visitorData.PoI) {
          if (PoICounter[PoI]) {
            const x = this.hmsToSeconds(visitorData.PoI[PoI])
            const y = PoICounter[PoI]
            PoICounter[PoI] = +x + +y
          } else {
            PoICounter[PoI] = +this.hmsToSeconds(visitorData.PoI[PoI])
          }
        }
        for (const Presentation in visitorData.Presentations) {
          if (PresentationCounter[Presentation]) {
            PresentationCounter[Presentation] = +this.hmsToSeconds(visitorData.Presentations[Presentation]) + +PresentationCounter[Presentation]
          } else {
            PresentationCounter[Presentation] = +this.hmsToSeconds(visitorData.Presentations[Presentation])
          }
        }
        stay += +visitorData.Enjoy.stayRaw
        avgPres += +visitorData.Enjoy.moreThenAverageRaw
        presWatched += +visitorData.Enjoy.numberOfPresentationsFinished
      }
      for (const PoI in PoICounter) {
        PoICounter[PoI] = this.secondsToHMS(+PoICounter[PoI] / +visitorsCounter)
      }
      for (const Presentation in PresentationCounter) {
        PresentationCounter[Presentation] = this.secondsToHMS(+PresentationCounter[Presentation] / +visitorsCounter)
      }
      this.groupSummary.TimeSpentInMuseum = this.secondsToHMS(visitCounter / +visitorsCounter)
      this.groupSummary.PoI = PoICounter
      this.groupSummary.Presentations = PresentationCounter
      this.groupSummary.Enjoy = {
        stay: (+stay / +visitorsCounter) > this.hmsToSeconds(this.avgTimeInMuseum),
        moreThenAverage: (+avgPres / +visitorsCounter) > this.avgPresentationWatched,
        numberOfPresentationsFinished: Math.round(+presWatched / +visitorsCounter)
      }
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

div{
  text-align: center;
}

div table {
  margin: 0 auto;
}

th, td {
  padding: 10px;
}

table tr th {
  font-size: 18px;
}

table tr:nth-child(1) th {
  color: red;
  border-bottom-color: black;
  font-size: 30px;
}

.button-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em .6em .6em .6em;
  width: 190px;
  box-sizing: border-box;
  margin: auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}

.finished_pres {
  font-size: 30px;
}
</style>
