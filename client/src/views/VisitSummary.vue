<template>
  <div>
    <input type='radio' id='radio_group' value='group' name='summaryChooser' @click='selectTarget' checked>
    <label for='radio_group'>Group</label>
    <input type='radio' id='radio_visitor' value='visitor' name='summaryChooser' @click='selectTarget'>
    <label for='radio_visitor'>Visitor</label>
    <br>
    <br>
    <select @change=selectGroup v-if="this.picked === 'group'" v-model='inputSelectGroup' class='select-css'>
      <option value='0'></option>
      <option v-for='group in this.groupList' :key='group' v-bind:value='group'>{{ group }}</option>
    </select>
    <select @change=selectVisitor v-if="this.picked === 'visitor'" v-model='inputSelectVisitor' class='select-css'>
      <option value='0'></option>
      <option v-for='visitor in this.visitorsList' :key='visitor' v-bind:value='visitor'>{{ visitor }}</option>
    </select>
    <p class='error' v-if='this.error'>{{ this.error }}</p>
    <Summary :visitors=this.visitorsSelected :visitorsData=this.selectedVisitorsData
             :avgPresentationWatched=this.averagePresentationWatched :avgTimeInMuseum=this.averageTimeInMuseum></Summary>
  </div>
</template>

<script>
import Summary from '@/components/Summary.vue'
import FetchDataUtils from '../FetchDataUtils'

export default {
  name: 'VisitSummary',
  components: {
    Summary
  },
  data () {
    return {
      groupList: [],
      visitorsList: [],
      visitorsSelected: [],
      selectedVisitorsData: [],
      visitorsData: [],
      picked: '',
      inputSelectGroup: '',
      inputSelectVisitor: '',
      averagePresentationWatched: 0,
      averageTimeInMuseum: '',
      error: ''
    }
  },
  async created () {
    try {
      this.picked = 'group'
      const data = await FetchDataUtils.getAllData()
      this.visitorsData = data.visitorsData
      this.groupList = this.visitorsData.map(visitorData => visitorData.groupID)
      // Cut group duplicates
      this.groupList = this.groupList.filter((groupElement, groupIndex) => this.groupList.indexOf(groupElement) === groupIndex)
      this.visitorsList = this.visitorsData.map(visitorData => visitorData.visitorID)
      this.averagePresentationWatched = this.getAveragePresentationWatched()
      this.averageTimeInMuseum = this.getAverageTimeInMuseum()
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    getAveragePresentationWatched () {
      const visitorsNumber = this.visitorsData.length
      let presentationsCounter = 0
      let presentationsWatched = []
      for (const visitor of this.visitorsData) {
        presentationsWatched = visitor.presentations
        presentationsWatched = presentationsWatched.map(presentation => presentation.exhibit)
        // cut presentation duplicates
        presentationsWatched = presentationsWatched.filter((groupElement, groupIndex) => presentationsWatched.indexOf(groupElement) === groupIndex)
        presentationsCounter += presentationsWatched.length
      }
      return Math.round(+presentationsCounter / +visitorsNumber)
    },
    getAverageTimeInMuseum () {
      let counter = 0
      for (const visitor of this.visitorsData) {
        counter += Summary.methods.hmsToSeconds(Summary.methods.getVisitTime(visitor).toString())
      }
      return Summary.methods.secondsToHMS(+counter / +this.visitorsData.length)
    },
    selectGroup (e) {
      if (e.target.options.selectedIndex > -1) {
        const selectedGroup = e.target.options[e.target.options.selectedIndex].value
        this.selectedVisitorsData = this.visitorsData.filter(visitorData => visitorData.groupID === selectedGroup)
        this.visitorsSelected = this.selectedVisitorsData.map(visitorData => visitorData.visitorID)
      }
    },
    selectVisitor (e) {
      if (e.target.options.selectedIndex > -1) {
        const selectedVisitor = e.target.options[e.target.options.selectedIndex].value
        this.selectedVisitorsData = this.visitorsData.filter(visitorData => visitorData.visitorID === selectedVisitor)
        this.visitorsSelected = this.selectedVisitorsData.map(visitorData => visitorData.visitorID)
      }
    },
    selectTarget (e) {
      this.inputSelectGroup = '0'
      this.inputSelectVisitor = '0'
      this.picked = e.target.attributes.value.value
    }
  }
}
</script>

<style scoped>
label {
  font-size: 19px;
}

.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 90px;
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
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight:normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
  background-position: left .7em top 50%, 0 0;
  padding: .6em .8em .5em 1.4em;
}

/* Disabled styles */
.select-css:disabled, .select-css[aria-disabled=true] {
  color: graytext;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
}
.select-css:disabled:hover, .select-css[aria-disabled=true] {
  border-color: #aaa;
}
</style>
