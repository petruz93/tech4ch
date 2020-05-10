<template>
  <div>
    <select @change=selectGroup>
      <option></option>
      <option v-for='group in this.groupList' :key='group' v-bind:value='group'>{{ group }}</option>
    </select>
    <p class='error' v-if='this.error'>{{ this.error }}</p>
    <Map :visit=this.visit :visitors=this.visitorsGroupList :group=this.selectedGroup></Map>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import GroupService from '../GroupService.js'
import { MoveVisitorsFunctions } from '../../public/moveVisitors'
export default {
  name: 'PlayBack',
  data () {
    return {
      visitorsData: [],
      mapData: [],
      selectedGroup: '',
      groupList: [],
      visitorsGroupList: [],
      visit: [],
      error: ''
    }
  },
  // Get data from the backend
  async created () {
    try {
      const data = await GroupService.getVisitGroup()
      const PoICoordinates = {}
      for (const PoI of data.mapData) {
        PoICoordinates[PoI.name] = [PoI.x, PoI.y]
      }
      this.mapData = PoICoordinates
      this.visitorsData = data.visitorsData
      this.groupList = this.visitorsData.map(visitorData => visitorData.groupID)
      // Cut group duplicates
      this.groupList = this.groupList.filter((groupElement, groupIndex) => this.groupList.indexOf(groupElement) === groupIndex)
    } catch (error) {
      this.error = error.message
    }
  },
  components: {
    Map
  },
  methods: {
    selectGroup (e) {
      if (e.target.options.selectedIndex > -1) {
        this.selectedGroup = e.target.options[e.target.options.selectedIndex].value
        this.visitorsGroupList = this.visitorsData.filter(visitorData => visitorData.groupID === this.selectedGroup)
          .map(visitorData => visitorData.visitorID)
        this.generateVisit()
        MoveVisitorsFunctions.changeSpeed(5)
        MoveVisitorsFunctions.resetVisit(this.visitorsGroupList)
      }
    },
    generateVisit () {
      const selectedVisitorsData = this.visitorsData.filter(visitorData => this.visitorsGroupList.includes(visitorData.visitorID))
      let selectedVisitorsList = []
      for (const visitorData of selectedVisitorsData) {
        selectedVisitorsList = selectedVisitorsList.concat([visitorData.visitorID])
      }
      const visitorsPositions = selectedVisitorsData.map(visitorData => visitorData.positions)
      let visit = []
      console.log(visitorsPositions)
      for (const visitorPositionsIndex in visitorsPositions) {
        for (const visitorPosition of visitorsPositions[visitorPositionsIndex]) {
          const exhibit = visitorPosition.exhibit
          // TODO: Change "visitRow" name, it's terribly ugly
          const visitRow = [
            visitorPosition.startTime,
            this.mapData[exhibit][0],
            this.mapData[exhibit][1],
            selectedVisitorsList[visitorPositionsIndex],
            exhibit
          ]
          visit = visit.concat([visitRow])
        }
      }
      visit = visit.sort(function (a, b) {
        return a[0].localeCompare(b[0])
      })
      this.visit = visit
    }
  }
}
</script>
