let crashTable, crashes = [];
const lsuCoords = { latitude: 30.4133, longitude: -91.1800 };
const cityBounds = { minLat: 30.3290, maxLat: 30.5838, minLon: -91.2805, maxLon: -91.0025 };
const aspectRatio = (cityBounds.maxLon - cityBounds.minLon) / (cityBounds.maxLat - cityBounds.minLat);

function preload() {
  crashTable = loadTable("Legacy_Baton_Rouge_Traffic_Incidents__2021_-_2022__20241125.csv", "header");
}

function setup() {
  createCanvas(800, 800 / aspectRatio);
  
  crashes = crashTable.rows.map(row => ({
    latitude: parseFloat(row.get('LATITUDE')),
    longitude: parseFloat(row.get('LONGITUDE')),
    primaryFactor: row.get('PRIMARY FACTOR')
  }));
}



function draw() {
  background(0);
  noStroke();

  for (let i = 0; i < crashes.length; i++) {
    const { latitude, longitude, primaryFactor } = crashes[i];

    let x = map(longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
    let y = map(latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
    
    fill(getColorForPrimaryFactor(primaryFactor));
    circle(x, y, 10);
  }

  let lsuX = map(lsuCoords.longitude, cityBounds.minLon, cityBounds.maxLon, 0, width);
  let lsuY = map(lsuCoords.latitude, cityBounds.minLat, cityBounds.maxLat, height, 0);
  fill(128, 0, 128);
  circle(lsuX, lsuY, 25);
}

function getColorForPrimaryFactor(factor) {
  switch (factor) {
    case 'VIOLATIONS': return color(255, 0, 0);
    case 'ROAD SURFACE': return color(0, 255, 0);
    case 'MOVEMENT PRIOR TO CRASH': return color(0, 0, 255);
    case 'CONDITION OF DRIVER': return color(150, 75, 0);
    case 'VEHICLE CONDTITIONS': return color(123, 255, 74);


    default: return color(200);
  }
}
