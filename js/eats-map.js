import { showNewPlaceForm } from "./data-entry.js";

function initializeeatsMap(eventBus) {
  const eatsMap = L.map('eats-map').setView([39.949996064716615, -75.16402289893041], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    apiKey: 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA',
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 90,
    zoomOffset: -1,
    id: 'mapbox/streets-v12',
    accessToken: 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA',
  }).addTo(eatsMap);

  // User click on map
  eatsMap.on('click', function(e) {
  
    // Get the clicked coordinates
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    showNewPlaceForm(eatsMap,lat,lng);

    }
  );

  eatsMap.dataLayer = L.geoJSON(
    
    null, {
      style:getEatsStyle,
      pointToLayer: (feature, latlng) => 
      L.circleMarker(latlng)
    })
    .bindTooltip(
      layer => {
        return layer.feature.properties['Name'];
      }
    ).addTo(eatsMap);

  eatsMap.highlightedIDs = new Set();
  eatsMap.EatsLayers = {};
  eatsMap.eventBus = eventBus;

  setupMapEventHandlers(eatsMap);

  return eatsMap;
}

function setupMapEventHandlers(map) {
  map.eventBus.addEventListener('selectionchanged', (evt) => {
    const { added, removed } = evt.detail;
    highlightEatsOnMap(added, map);
    unhighlightEatsOnMap(removed, map);
    
  });

  map.eventBus.addEventListener('filterschanged', (evt) => {
    const { include } = evt.detail;
    showEatsOnMap(include, map);
  });

  map.eventBus.addEventListener("filtered",(evt)=> {
    const filteredEats = evt.detail
 
    redrawEatsOnMap(filteredEats, map)
  })
  
}

function makeEatsFeature(Eats) {
  console.log(Eats)
  const feature = {
    type: 'Feature',
    id: Eats.properties['Name'],
    properties: {},
    geometry: Eats.geometry,
  };
  return feature;
}

function getEatsStyle(place) {
  if (place.properties.type=="Eat") {
    return {
      stroke: true,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: 10,
    };
  } else if (place.properties.type=="Drink") {
    return {
      stroke: true,
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.5,
      radius: 10,
    };
  }
    else if (place.properties.type=="Shop") {
      return {
        stroke: true,
        color: 'Orange',
        fillColor: 'Orange',
        fillOpacity: 0.5,
        radius: 10,
      };
  }
  else if (place.properties.PlaceType=="Culture") {
    return {
      stroke: true,
      color: 'Green',
      fillColor: 'Green',
      fillOpacity: 0.5,
      radius: 10,
    };
  }
  else if (place.properties.PlaceType=="Event") {
    return {
      stroke: true,
      color: 'Purple',
      fillColor: 'Purple',
      fillOpacity: 0.5,
      radius: 3,
    };  
  }  
  {
    return {
      stroke: false,
      fillColor: 'blue',
      fillOpacity: 0.5,
      radius: 3,
    };
  }
}

let firstFit = false;
function redrawEatsOnMap(Restaurants, map) {
  map.dataLayer.clearLayers();
  let boundsToFit = null;
  
  for (const Place of Restaurants) {
    map.dataLayer.addData(Place);
  }

}

function isHighlightedOnMap(Name, map) {
  const id = Name['Name'];
  return map.highlightedIDs.has(id);
}

function highlightEatsOnMap(Restaurants, map) {
  for (const Name of Restaurants) {
    const id = Name['Name'];
    map.highlightedIDs.add(id);
  }
  redrawSchoolsOnMap(schools, map);
}

function unhighlightEatsOnMap(Restaurants, map) {
  for (const Name of Restaurants) {
    const id = Name['Name'];
    map.highlightedIDs.delete(id);
  }
  redrawEatsOnMap(Restaurants, map);
}

function showEatsOnMap(Restaurants, map) {
  map.places=Restaurants;
  redrawEatsOnMap(Restaurants, map);
}

export {
  setupMapEventHandlers,
  highlightEatsOnMap,
  initializeeatsMap,
  showEatsOnMap,
  unhighlightEatsOnMap,
};
