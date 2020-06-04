import $ from 'jquery'

// The first value is the speed of the animation
// while the second is the sleep time between the beginning of an animation and the next
const slowAnimateSpeed = [1500, 2500]
const fastAnimateSpeed = [400, 400]
let currentAnimateSpeed = slowAnimateSpeed
// Current position of every visitor on the map
// Key: visitor ID
// Value: visitor's position
const currentVisitorsPositions = {}
// Boolean to catch the event from the replay button or the group change
let stopVisitEvent = false
// IDs and Classes from the DOM
const backgroundImageID = '#bkg_img'
const visitorClass = '.visitor'
const playButtonID = '#play'
const timestampParagraphID = '#timestamp'
const PoIParagraphID = '#poiName'
const rangeSliderID = '#speedRange'

// Retrieve the current position of the Map in the screen
function getBkgImagePosition () {
  return $(backgroundImageID).position()
}

function getVisitorImageWidth () {
  const visitorImageWidth = $(visitorClass).css('width')
  return +visitorImageWidth.substring(0, +visitorImageWidth.length - +2)
}

// Fix the coordinate of the PoI, the background image isn't at (0,0)
// Mat's Position has the correct coordinates while the PoI's need a little fix
function fixPosition (wrongPosition, matPosition) {
  const bkgPosition = getBkgImagePosition()
  let visitorImageWidth = getVisitorImageWidth()
  // The top-left of the visitor image is in the given position, not the center!
  // With this simple fraction we get the center of the visitor in the PoI ;)
  // Pro Tip: the image is a square
  visitorImageWidth = +visitorImageWidth / +2
  const fixedPosition = wrongPosition
  if (!matPosition) {
    fixedPosition.top = +fixedPosition.top + +fixedPosition.top * 0.35
  }
  fixedPosition.top = +fixedPosition.top + +bkgPosition.top + -visitorImageWidth
  if (!matPosition) {
    fixedPosition.left = +fixedPosition.left + +fixedPosition.left * 0.35
  }
  fixedPosition.left = +fixedPosition.left + +bkgPosition.left + -visitorImageWidth
  return fixedPosition
}

// Sleep function, it's useful to temporize the movement of the visitors
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Prevent the overlap of the visitors in the same PoI
function translateVisitor (customPosition, numberOfVisitorsInCustomPosition) {
  const visitorTranslation = 10
  for (const [, visitorPosition] of Object.entries(currentVisitorsPositions)) {
    if (customPosition.top === visitorPosition.top && customPosition.left === visitorPosition.left) {
      customPosition.left = +customPosition.left + +visitorTranslation
      return translateVisitor(customPosition, +numberOfVisitorsInCustomPosition + +1)
    }
  }
  return 0
}

export const MoveVisitorsFunctions = {
  // Move visitors on the map
  moveVisitors: async function (visitors, visit) {
    if (visitors.length > 0 && visit.length > 0) {
      $(playButtonID).hide()
      stopVisitEvent = false
      // await this.showVisitorsInTheMap(visitors)
      for (const visitorMovement of visit) {
        const visitorID = '#' + visitorMovement[3]
        const nextPoI = fixPosition({ top: visitorMovement[2], left: visitorMovement[1] }, false)
        const visitorsInNextPoI = translateVisitor(nextPoI, 0)
        if (visitorsInNextPoI > 0) {
          nextPoI.left = +nextPoI.left + (+10 * +visitorsInNextPoI)
        }
        if (!stopVisitEvent) {
          $(visitorID).animate(nextPoI, currentAnimateSpeed[0])
          $(timestampParagraphID).text(visitorMovement[0])
          $(timestampParagraphID).css('visibility', 'visible')
          $(PoIParagraphID).text(visitorMovement[4])
          $(PoIParagraphID).css('visibility', 'visible')
          currentVisitorsPositions[visitorMovement[3]] = nextPoI
          await sleep(currentAnimateSpeed[1])
        } else {
          return
        }
      }
      $(playButtonID).show()
    }
  },
  // Reset the visit, stopping the current movement if there's one
  resetVisit: async function (visitors) {
    $(playButtonID).hide()
    stopVisitEvent = true
    await sleep(currentAnimateSpeed[1])
    $(playButtonID).show()
    $(timestampParagraphID).css('visibility', 'hidden')
    $(PoIParagraphID).css('visibility', 'hidden')
    await this.showVisitorsInTheMap(visitors)
  },
  // Change the visit speed
  changeSpeed: function (rangeValue) {
    const maxSpeedSlider = $(rangeSliderID).attr('max')
    const minSpeedSlider = $(rangeSliderID).attr('min')
    const rangeSliderInterval = +maxSpeedSlider - +minSpeedSlider
    currentAnimateSpeed = [
      ((Math.abs((fastAnimateSpeed[0] - slowAnimateSpeed[0])) / rangeSliderInterval) *
        (maxSpeedSlider - rangeValue)) + fastAnimateSpeed[0],
      ((Math.abs((fastAnimateSpeed[1] - slowAnimateSpeed[1])) / rangeSliderInterval) *
        (maxSpeedSlider - rangeValue)) + fastAnimateSpeed[1]
    ]
  },
  // Put visitors on the mat
  showVisitorsInTheMap: async function (currentVisitorsList) {
    const matPosition = { top: 510, left: 940 }
    const visitorImageWidth = getVisitorImageWidth()
    const fixedMatPosition = fixPosition(matPosition, true)
    // I need to shift visitors to avoid overlap in the mat
    let xTranslated = 0
    for (const visitor of currentVisitorsList) {
      const visitorID = '#' + visitor
      $(visitorID).css('top', fixedMatPosition.top)
      $(visitorID).css('left', +fixedMatPosition.left + +xTranslated * +visitorImageWidth)
      $(visitorID).css('visibility', 'visible')
      currentVisitorsPositions[visitor] = fixedMatPosition
      xTranslated = xTranslated + 1
    }
    // await sleep(800)
  }
}
