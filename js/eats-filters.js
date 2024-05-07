function initializeFilters(data) {
  const eatsCheckboxes = document.querySelectorAll('[name="place-filter-type"]');
  const barCheckboxes = document.querySelectorAll('[name="eats-filter-bar"]');
  const shoppingCheckboxes = document.querySelectorAll('[name="eats-filter-shopping"]');
  const attractionCheckboxes = document.querySelectorAll('[name="eats-filter-attraction"]');
  const eventCheckboxes = document.querySelectorAll('[name="eats-filter-event"]');

  // Setup event listeners for all checkboxes
  eatsCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterData));
  barCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterData));
  shoppingCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterData));
  attractionCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterData));
  eventCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterData));

  // Function to filter data based on checkbox selections
  function filterData() {
    const filteredData = data.features.filter(shouldShowPlace);
    const newEvent = new CustomEvent("filtered", { detail: filteredData });
    eventBus.dispatchEvent(newEvent);
    makeNewURL();
  }

  // Function to check if a place should be shown based on checkbox selections
  function shouldShowPlace(place) {
    // Implement logic here based on checkbox states
    // For simplicity, I'll assume you only have eats checkboxes for now
    const selectedEats = Array.from(eatsCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    return selectedEats.includes(place.properties.Type);
  }

  // Function to update URL with selected checkbox values
  function makeNewURL() {
    const eatsURL = Array.from(eatsCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const barsURL = Array.from(barCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const shopURL = Array.from(shoppingCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const attractionURL = Array.from(attractionCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const eventURL = Array.from(eventCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

    const hash = `Eats=${eatsURL.join(',')}&Bars=${barsURL.join(',')}&Shopping=${shopURL.join(',')}&Attraction=${attractionURL.join(',')}&Event=${eventURL.join(',')}`;
    window.location.hash = hash;
  }
}

export { initializeFilters };


// function initializeFilters(eats, eventBus) {

//   const eatsCheckboxes = document.querySelectorAll('[name="place-filter-type"]');
//   const barCheckboxes = document.querySelectorAll('[name="eats-filter-bar"]');
//   const shoppingCheckboxes = document.querySelectorAll('[name="eats-filter-shopping"]');
//   const attractionCheckboxes = document.querySelectorAll('[name="eats-filter-attraction"]');
//   const eventCheckboxes = document.querySelectorAll('[name="eats-filter-event"]');


//   window.eatsCuisineFilters = eatsCheckboxes;

//   // Create Eats Checkbox Filter

//   for (const eatsID of eatsCheckboxes) {
//     eatsID.addEventListener(
//       "change", () => {
//         filterEats();
//       }
//     )
//   }

//   // Create Bar Checkbox Filter 

//   for (const barID of barCheckboxes) {
//     barID.addEventListener(
//       "change", () => {
//         filterBar();
//       }
//     )
//   }

//   // Create Shopping Checkbox Filter 

//   for (const shoppingID of shoppingCheckboxes) {
//     shoppingID.addEventListener(
//       "change", () => {
//         filterShopping();
//       }
//     )
//   }

//   // Create Attraction Checkbox Filter 

//   for (const attractionID of attractionCheckboxes) {
//     attractionID.addEventListener(
//       "change", () => {
//         filterAttraction();
//       }
//     )
//   }

//   // Create Event Checkbox Filter

//   for (const eventID of eventCheckboxes) {
//     eventID.addEventListener(
//       "change", () => {
//         filterEvent();
//       }
//     )
//   }

//   // Setup Filters to Understand Eats, Bars, Attractions, & Events

//   function shouldShowEats(restaurant) {
//     let inSelectedEats = false;
//     let inSelectedBar = false;
//     let inSelectedShopping = false;
//     let inSelectedAttraction = false;
//     let inSelectedEvent = false;

//     // Eats
//     const checkedEatsCBs = [];
//     for (const cb of eatsCheckboxes) {
//       if (cb.checked) {
//         checkedEatsCBs.push(cb);
//       }
//     }

//     if (checkedEatsCBs.length > 0) {
//       for (const cb of checkedEatsCBs) {
//         if (restaurant.properties.Type == cb.value) {
//           inSelectedEats = true;
//           break;

//         }
//       }
//     } else {
//       inSelectedEats = true;
//     }

//     // Bars 

//     const checkedBarsCBs = [];
//     for (const cb of barCheckboxes) {
//       if (cb.checked) {
//         checkedBarsCBs.push(cb);
//       }
//     }

//     if (checkedBarsCBs.length > 0) {
//       for (const cb of checkedBarsCBs) {
//         if (restaurant.properties.Type == cb.value) {
//           inSelectedBar = true;

//         }
//       }
//     } else {
//       inSelectedBar = true;
//     }

//     // Shopping 

//     const shoppingCBs = [];
//     for (const cb of shoppingCheckboxes) {
//       if (cb.checked) {
//         shoppingCBs.push(cb);
//       }
//     }

//     if (shoppingCBs.length > 0) {
//       for (const cb of shoppingCBs) {
//         if (restaurant.properties.Type == cb.value) {
//           inSelectedShopping = true;

//         }
//       }
//     } else {
//       inSelectedShopping = true;
//     }

//     return inSelectedEats && inSelectedBar && inSelectedShopping && inSelectedAttraction && inSelectedEvent
//   }

//   // Setup Individual Filters for Eats, Bars, Shopping, Attractions, & Events -- PICKUP HERE !!!!!

//   //Eats Checkbox Filter

//   function filterEats() {
//     const filteredData = []
//     for (const eatsPlace of eats.features) {
//       if (shouldShowEats(eatsPlace)) {
//         filteredData.push(eatsPlace);
//       }

//     }
//     const newEvent3 = new CustomEvent("filtered",
//       {
//         detail: filteredData
//       })
//     eventBus.dispatchEvent(newEvent3)
//     makeNewURL();
//   }

//   // Update URL 

//   function makeNewURL() {

//     const eatsURL = [];
//     for (const cb of eatsCheckboxes) {
//       if (cb.checked) {
//         eatsURL.push(cb.value);
//       }
//     }

//     const barsURL = [];
//     for (const cb of barCheckboxes) {
//       if (cb.checked) {
//         barsURL.push(cb.value);
//       }
//     }

//     const shopURL = [];
//     for (const cb of shoppingCheckboxes) {
//       if (cb.checked) {
//         shopURL.push(cb.value);
//       }
//     }

//     const attractionURL = [];
//     for (const cb of attractionCheckboxes) {
//       if (cb.checked) {
//         attractionURL.push(cb.value);
//       }
//     }

//     const eventURL = [];
//     for (const cb of eventCheckboxes) {
//       if (cb.checked) {
//         eventURL.push(cb.value);
//       }
//     }

//     const eats_param = (eatsURL.join(','));
//     const bars_param = (barsURL.join(','));
//     const shop_param = (shopURL.join(','));
//     const attraction_param = (attractionURL.join(','));
//     const event_param = (eventURL.join(','));

//     const hash = `Eats=${eats_param}&bars=${bars_param}&Shopping=${shop_param}&Attraction=${attraction_param}&Event=${event_param}`;
//     window.location.hash = hash;

//   }

//   // Bars Checkbox Filter

//   function filterBar() {
//     const filteredData = []
//     for (const eatsPlace of eats.features) {
//       if (shouldShowEats(eatsPlace)) {
//         filteredData.push(eatsPlace);

//       }
//       const newEvent4 = new CustomEvent("filtered",
//         {
//           detail: filteredData
//         })
//       eventBus.dispatchEvent(newEvent4)
//       makeNewURL();
//     }
//   }

//   // Shops Checkbox Filter 

//   function filterShops() {
//     const filteredData = []
//     for (const eatsPlace of eats.features) {
//       if (shouldShowEats(eatsPlace)) {
//         filteredData.push(eatsPlace);

//       }
//       const newEvent5 = new CustomEvent("filtered",
//         {
//           detail: filteredData
//         })
//       eventBus.dispatchEvent(newEvent5)
//     }
//   }

//     // Attraction Checkbox Filter 

//     function filterAttraction() {
//       const filteredData = []
//       for (const eatsPlace of eats.features) {
//         if (shouldShowEats(eatsPlace)) {
//           filteredData.push(eatsPlace);
  
//         }
//         const newEvent6 = new CustomEvent("filtered",
//           {
//             detail: filteredData
//           })
//         eventBus.dispatchEvent(newEvent6)
//       }
//     }

//       // Event Checkbox Filter 

//   function filterEvent() {
//     const filteredData = []
//     for (const eatsPlace of eats.features) {
//       if (shouldShowEats(eatsPlace)) {
//         filteredData.push(eatsPlace);

//       }
//       const newEvent7 = new CustomEvent("filtered",
//         {
//           detail: filteredData
//         })
//       eventBus.dispatchEvent(newEvent7)
//     }
//   }

// }

// export {
//   initializeFilters
// }