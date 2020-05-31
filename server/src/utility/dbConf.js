const mongoose = require('mongoose');
const path = require('path');
const parser = require('./csvParser');
const Poi = require('../models/pointOfInterest');
const Visitor = require('../models/visitor');
const mapData = require('../files/map-data');

const mongo = {
  host: 'localhost',
  port: 27017,
  usedDb: 'tech4ch',
  get address() { return `${this.host}:${this.port}`; },
  get endpoint() { return `mongodb://${this.address}/${this.usedDb}`; }
};

async function saveVisitors() {
  const dirpath = path.join(__dirname, '../files/visitors-log/');
  try {
    const visitorsData = await parser.readAllVisitorsFromDir(dirpath);
    Visitor.create(visitorsData);
  } catch (err) {
    console.error(err);
  }
}

function savePois() {
  const pois = [];
  mapData.forEach((p) => {
    const newPoi = new Poi(p);
    pois.push(newPoi);
  });
  Poi.create(pois);
}

exports.initDb = async () => {
  try {
    await mongoose.connect(mongo.endpoint, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const collections = await mongoose.connection.db.listCollections().toArray();
    if (!collections.length) {
      await saveVisitors();
      savePois();
      console.log('Database populated');
    }
    console.log('MongoDB connection ESTABLISHED on', mongo.address);
  } catch (err) {
    console.log('MongoDB connection ERROR:', err);
  }
};
