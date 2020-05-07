import $ from 'jquery'

// The first value is the speed of the animation
// while the second is the sleep time between the beginning of an animation and the next
const slowAnimateSpeed = [1000, 2000]
const fastAnimateSpeed = [500, 500]
let currentAnimateSpeed = slowAnimateSpeed
const positions = {}
let replay = false

// Retrieve the current position of the Map in the screen
function getBkgImagePosition () {
  return $('.bkg_img').position()
}

// Fix the coordinate of the POI, the background image isn't in (0,0)
function fixPosition (wrongPosition, matPosition = true) {
  const bkgPosition = getBkgImagePosition()
  let width
  try {
    width = $('#w1').css('width')
  } catch (e) {
    width = 30
  }
  width = +width.substring(0, width.length - 2) / +2
  const fixedPosition = wrongPosition
  if (!matPosition) {
    fixedPosition.top = +fixedPosition.top + +fixedPosition.top * 0.35
  }
  fixedPosition.top = +fixedPosition.top + +bkgPosition.top + -width
  if (!matPosition) {
    fixedPosition.left = +fixedPosition.left + +fixedPosition.left * 0.35
  }
  fixedPosition.left = +fixedPosition.left + +bkgPosition.left + -width
  return fixedPosition
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Old visit for testing
// var visitor = [['14:12:05', '430', '383', 'w1'], ['14:12:19', '430', '265', 'w1'], ['14:12:32', '430', '265', 'w2'], ['14:13:23', '430', '383', 'w1'], ['14:14:11', '430', '265', 'w1'], ['14:14:13', '460', '64', 'w2'], ['14:14:47', '430', '383', 'w1'], ['14:14:55', '464', '229', 'w1'], ['14:19:19', '471', '36', 'w1'], ['14:19:49', '540', '48', 'w2'], ['14:20:16', '464', '229', 'w1'], ['14:20:34', '471', '36', 'w1'], ['14:20:55', '460', '64', 'w2'], ['14:21:07', '540', '48', 'w2'], ['14:21:27', '464', '229', 'w1'], ['14:21:36', '540', '48', 'w1'], ['14:21:45', '460', '64', 'w2'], ['14:21:50', '569', '66', 'w1'], ['14:21:51', '569', '66', 'w2'], ['14:21:56', '460', '64', 'w1'], ['14:22:17', '460', '64', 'w2'], ['14:22:18', '471', '36', 'w1'], ['14:22:19', '540', '48', 'w2'], ['14:22:34', '540', '48', 'w1'], ['14:24:17', '569', '66', 'w1'], ['14:24:23', '569', '66', 'w2'], ['14:24:32', '540', '48', 'w1'], ['14:24:37', '569', '66', 'w1'], ['14:25:36', '540', '48', 'w1'], ['14:25:58', '569', '66', 'w1'], ['14:27:03', '540', '48', 'w1'], ['14:28:51', '574', '340', 'w2'], ['14:29:38', '640', '383', 'w1'], ['14:29:48', '537', '315', 'w2'], ['14:31:27', '486', '325', 'w1'], ['14:31:34', '537', '315', 'w1'], ['14:31:50', '526', '335', 'w2'], ['14:32:22', '486', '325', 'w2'], ['14:32:34', '537', '315', 'w2'], ['14:32:43', '486', '325', 'w2'], ['14:32:45', '537', '315', 'w2'], ['14:33:10', '486', '325', 'w2'], ['14:33:25', '486', '325', 'w1'], ['14:33:25', '537', '315', 'w2'], ['14:33:31', '574', '340', 'w1'], ['14:33:33', '537', '315', 'w1'], ['14:35:08', '550', '240', 'w2'], ['14:36:12', '550', '240', 'w1'], ['14:37:08', '464', '229', 'w2'], ['14:38:09', '464', '229', 'w1'], ['14:38:53', '430', '265', 'w2'], ['14:39:50', '430', '265', 'w1'], ['14:40:20', '393', '250', 'w1'], ['14:40:23', '430', '265', 'w1'], ['14:41:04', '393', '250', 'w2'], ['14:41:41', '346', '223', 'w2'], ['14:42:00', '322', '304', 'w2'], ['14:42:25', '288', '324', 'w2'], ['14:42:37', '346', '223', 'w1'], ['14:42:57', '322', '304', 'w1'], ['14:43:27', '322', '304', 'w2'], ['14:43:43', '328', '325', 'w2'], ['14:44:02', '288', '324', 'w2'], ['14:44:05', '288', '324', 'w1'], ['14:44:07', '328', '325', 'w1'], ['14:44:13', '288', '324', 'w1'], ['14:44:15', '322', '304', 'w1'], ['14:44:25', '328', '325', 'w1'], ['14:44:41', '301', '290', 'w1'], ['14:45:06', '301', '290', 'w2'], ['14:45:47', '265', '297', 'w2'], ['14:46:07', '255', '322', 'w1'], ['14:46:15', '301', '290', 'w1'], ['14:46:21', '301', '290', 'w2'], ['14:46:22', '288', '324', 'w1'], ['14:46:27', '265', '297', 'w1'], ['14:46:29', '255', '322', 'w2'], ['14:47:09', '284', '276', 'w2'], ['14:49:16', '396', '154', 'w2'], ['14:50:42', '372', '198', 'w2'], ['14:50:50', '346', '223', 'w2'], ['14:52:08', '372', '198', 'w2'], ['14:52:25', '235', '248', 'w2'], ['14:52:59', '265', '297', 'w2'], ['14:53:37', '235', '248', 'w2'], ['14:55:17', '346', '223', 'w2'], ['14:56:09', '430', '265', 'w2'], ['14:56:27', '566', '383', 'w2']]

// async function showVisitorsInTheMap (visitors) {
//   const matPosition = { top: 510, left: 940 }
//   const fixedMatPosition = fixPosition(matPosition)
//   let xTranslated = 0
//   for (const element in visitors) {
//     $('#' + visitors[element]).css('top', fixedMatPosition.top)
//     $('#' + visitors[element]).css('left', +fixedMatPosition.left + +xTranslated * 35)
//     $('#' + visitors[element]).css('visibility', 'visible')
//     positions[visitors[element]] = fixedMatPosition
//     xTranslated = xTranslated + 1
//   }
//   await sleep(1000)
// }

function translateVisitor (customPosition, visitorInCustomPosition) {
  for (const [, visitorPosition] of Object.entries(positions)) {
    if (customPosition.top === visitorPosition.top && customPosition.left === visitorPosition.left) {
      customPosition.left = +customPosition.left + +10
      return translateVisitor(customPosition, +visitorInCustomPosition + +1)
    }
  }
  return 0
}

export const MyFunctions = {
  moveVisitors: async function (visitors, visit) {
    replay = false
    await this.showVisitorsInTheMap(visitors)
    $('#play').hide()
    for (const element of visit) {
      const id = '#' + element[3]
      const customPosition = fixPosition({ top: element[2], left: element[1] }, false)
      const visitorInCustomPosition = translateVisitor(customPosition, 0)
      if (visitorInCustomPosition > 0) {
        customPosition.left = +customPosition.left + (+10 * +visitorInCustomPosition)
      }
      if (!replay) {
        $(id).animate(customPosition, currentAnimateSpeed[0])
        $('#timestamp').text(element[0])
        $('#timestamp').css('visibility', 'visible')
        positions[element[3]] = customPosition
        await sleep(currentAnimateSpeed[1])
      } else {
        return
      }
    }
  },
  replay: async function (visitors) {
    $('#play').hide()
    replay = true
    await sleep(currentAnimateSpeed[1])
    $('#play').show()
    $('#timestamp').css('visibility', 'hidden')
    await this.showVisitorsInTheMap(visitors)
    // window.location.reload()
  },
  changeSpeed: function (id) {
    if (id === 'fast') {
      currentAnimateSpeed = fastAnimateSpeed
    } else if (id === 'slow') {
      currentAnimateSpeed = slowAnimateSpeed
    }
  },
  showVisitorsInTheMap: async function (visitors) {
    const matPosition = { top: 510, left: 940 }
    const fixedMatPosition = fixPosition(matPosition)
    let xTranslated = 0
    for (const element in visitors) {
      $('#' + visitors[element]).css('top', fixedMatPosition.top)
      $('#' + visitors[element]).css('left', +fixedMatPosition.left + +xTranslated * 35)
      $('#' + visitors[element]).css('visibility', 'visible')
      positions[visitors[element]] = fixedMatPosition
      xTranslated = xTranslated + 1
    }
    await sleep(1000)
  }
}
