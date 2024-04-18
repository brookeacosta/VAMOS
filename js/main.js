import {initializeeatsMap, showEatsOnMap} from './eats-map.js';
import {initializeFilters} from './eats-filters.js';
import './data-entry.js';
import {getDocs} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
import { placeCollection } from './firebase.js';

// Is this section right since we added features to the eats-map.js file?
async function loadPlaces() {
  const placeQuery = await getDocs(placeCollection);
  const places = placeQuery.docs.map((doc) => doc.data());

  const data = {
    type: 'FeatureCollection',
    features: places,
  };
  console.log(data);
  return data;
};

// This was Existing Code 
// async function downloadRestaurants(onSuccess, onFailure) {
//   // try {
//     const resp = await fetch('data/Restaurants.geojson');
//     if (resp.status === 200) {
//       const data = await resp.json();
//       onSuccess(data);
//     }

// }

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