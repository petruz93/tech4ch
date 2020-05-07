// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express() // create your express app

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/hello', (req, res) => {
  const visit = [["14:12:05", "430", "383", "w1"], ["14:12:10", "630", "400", "w3"], ["14:12:19", "430", "265", "w1"], ["14:12:19", "430", "265", "w4"], ["14:12:21", "430", "265", "w3"], ["14:12:32", "430", "265", "w2"], ["14:13:23", "430", "383", "w1"], ["14:14:11", "430", "265", "w1"], ["14:14:13", "460", "64", "w2"], ["14:14:47", "430", "383", "w1"], ["14:14:55", "464", "229", "w1"], ["14:19:19", "471", "36", "w1"], ["14:19:49", "540", "48", "w2"], ["14:20:16", "464", "229", "w1"], ["14:20:34", "471", "36", "w1"], ["14:20:55", "460", "64", "w2"], ["14:21:07", "540", "48", "w2"], ["14:21:27", "464", "229", "w1"], ["14:21:36", "540", "48", "w1"], ["14:21:45", "460", "64", "w2"], ["14:21:50", "569", "66", "w1"], ["14:21:51", "569", "66", "w2"], ["14:21:56", "460", "64", "w1"], ["14:22:17", "460", "64", "w2"], ["14:22:18", "471", "36", "w1"], ["14:22:19", "540", "48", "w2"], ["14:22:34", "540", "48", "w1"], ["14:24:17", "569", "66", "w1"], ["14:24:23", "569", "66", "w2"], ["14:24:32", "540", "48", "w1"], ["14:24:37", "569", "66", "w1"], ["14:25:36", "540", "48", "w1"], ["14:25:58", "569", "66", "w1"], ["14:27:03", "540", "48", "w1"], ["14:28:51", "574", "340", "w2"], ["14:29:38", "640", "383", "w1"], ["14:29:48", "537", "315", "w2"], ["14:31:27", "486", "325", "w1"], ["14:31:34", "537", "315", "w1"], ["14:31:50", "526", "335", "w2"], ["14:32:22", "486", "325", "w2"], ["14:32:34", "537", "315", "w2"], ["14:32:43", "486", "325", "w2"], ["14:32:45", "537", "315", "w2"], ["14:33:10", "486", "325", "w2"], ["14:33:25", "486", "325", "w1"], ["14:33:25", "537", "315", "w2"], ["14:33:31", "574", "340", "w1"], ["14:33:33", "537", "315", "w1"], ["14:35:08", "550", "240", "w2"], ["14:36:12", "550", "240", "w1"], ["14:37:08", "464", "229", "w2"], ["14:38:09", "464", "229", "w1"], ["14:38:53", "430", "265", "w2"], ["14:39:50", "430", "265", "w1"], ["14:40:20", "393", "250", "w1"], ["14:40:23", "430", "265", "w1"], ["14:41:04", "393", "250", "w2"], ["14:41:41", "346", "223", "w2"], ["14:42:00", "322", "304", "w2"], ["14:42:25", "288", "324", "w2"], ["14:42:37", "346", "223", "w1"], ["14:42:57", "322", "304", "w1"], ["14:43:27", "322", "304", "w2"], ["14:43:43", "328", "325", "w2"], ["14:44:02", "288", "324", "w2"], ["14:44:05", "288", "324", "w1"], ["14:44:07", "328", "325", "w1"], ["14:44:13", "288", "324", "w1"], ["14:44:15", "322", "304", "w1"], ["14:44:25", "328", "325", "w1"], ["14:44:41", "301", "290", "w1"], ["14:45:06", "301", "290", "w2"], ["14:45:47", "265", "297", "w2"], ["14:46:07", "255", "322", "w1"], ["14:46:15", "301", "290", "w1"], ["14:46:21", "301", "290", "w2"], ["14:46:22", "288", "324", "w1"], ["14:46:27", "265", "297", "w1"], ["14:46:29", "255", "322", "w2"], ["14:47:09", "284", "276", "w2"], ["14:49:16", "396", "154", "w2"], ["14:50:42", "372", "198", "w2"], ["14:50:50", "346", "223", "w2"], ["14:52:08", "372", "198", "w2"], ["14:52:25", "235", "248", "w2"], ["14:52:59", "265", "297", "w2"], ["14:53:37", "235", "248", "w2"], ["14:55:17", "346", "223", "w2"], ["14:56:09", "430", "265", "w2"], ["14:56:27", "566", "383", "w2"]]
  const visitors = ['w1', 'w2', 'w3', 'w4']
  const groupList = [192, 193, 194]
  res.json({
    visitors: visitors,
    visit: visit,
    groupList: groupList
  })
})

app.listen(process.env.PORT || 8081, () => {
  var port = (process.env.PORT) ? process.env.PORT : 8081;
  console.log('Server listening on port ' + port + '.')
})

