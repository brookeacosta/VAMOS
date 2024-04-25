import { debounce } from './function-tools.js';

const addressSearchInput = document.querySelector('[name="address-search"]');

function initializeAddressEntry(eventBus) {
  addressSearchInput.addEventListener('input', debounce(handleAddressSearch, 500));
}

async function handleAddressSearch() {
  const searchAddress = addressSearchInput.value;
  const apiKey = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA';
  const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAddress}.json?access_token=${apiKey}`);
  // eslint-disable-next-line no-unused-vars
  const options = resp.json();
}

export {
  initializeAddressEntry,
}