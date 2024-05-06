import {initializeeatsMap, showEatsOnMap} from './eats-map.js';
import {initializeFilters} from './eats-filters.js';
import './data-entry.js';
import {getDocs} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
import { placeCollection } from './firebase.js';

async function loadPlaces() {
  const placeQuery = await getDocs(placeCollection);
  const places = placeQuery.docs.map((doc) => doc.data());

  const data = {
    type: 'FeatureCollection',
    features: places.map(docToFeature),
  };
  console.log(data);
  return data;
};

// Convert firebase doc to geojson
function docToFeature (doc){
  const feature = {
    type:"Feature",
    properties: {
      name: doc.Name,
      type: doc.Type,
      description: doc.Description,
      where: doc.Where,
      photos: doc.Photos
      // FILL IN
    },
    geometry: {
      type: "Point",
      coordinates: doc.Where,
    }
  }
  return feature;
}

const eventBus = new EventTarget();
const eatsMap = initializeeatsMap(eventBus);
function onRestaurantsLoad(data){
  showEatsOnMap(data.features, eatsMap);

 initializeFilters(data,eventBus);

// Make these variables globally available.

window.Restaurants = data;
window.eatsMap = eatsMap;

}
async function mapRestaurants(){

  const data = await loadPlaces();
  onRestaurantsLoad(data);
}
mapRestaurants();