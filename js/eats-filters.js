function initializeFilters(eats, eventBus) {

  const eatsCheckboxes = document.querySelectorAll('[name="place-filter-type"]');
  const barCheckboxes = document.querySelectorAll('[name="eats-filter-bar"]');
  const shoppingCheckboxes = document.querySelectorAll('[name="eats-filter-shopping"]');
  const attractionCheckboxes = document.querySelectorAll('[name="eats-filter-attraction"]');
  const eventCheckboxes = document.querySelectorAll('[name="eats-filter-event"]');


  window.eatsCuisineFilters = eatsCheckboxes;

  //Making unique URLs

  // const hash = window.location.hash
  // console.log(hash)

  //  // Step 1: Remove the hash by using the "substring function"
  // const newHash = hash.substring(1).replace(/%20/g, ' ');
  // console.log(newHash)

  // //Step 2: Split the string into 2 separate strings using "split function" at the "&", leaving me with 2 separate strings
  // const [eatsHash, barsHash, shopHash, attractionHash, eventHash] = newHash.split("&");
  // console.log(eatsHash)
  // console.log(barsHash)
  // console.log(shopHash)
  // console.log(attractionHash)
  // console.log(eventHash)

  // // Step 3: Remove "eats=" from the string and split the rest of that string by ","
  // const newEatsHash = eatsHash.slice(5)
  // console.log(newEatsHash)

  // // Step 4: Do the same for bars string
  // const newBarsHash = barsHash.slice(4)
  // console.log(newBarsHash)

  // // Step 5: Do this for Shop Hash
  // const newShopHash = shopHash.slice(6)
  // console.log(newShopHash)

  // // Step 6: Do this for Attraction Hash
  //   const newAttractionHash = attractionHash.slice(15)
  //   console.log(newAttractionHash)

  // // Step 7: Do this for Event Hash
  //   const newEventHash = eventHash.slice(6)
  //   console.log(newEventHash)

  // // Step 8: This will leave us with an array of cuisines & an array of nhoods
  // const newestEatsHash = newEatsHash.split(",");
  // const newestBarsHash = newBarsHash.split(",");
  // const newestShopHash = newShopHash.split(",");
  // const newestAttractionHash = newAttractionHash.split(",");
  // const newestEventHash = newEventHash.split(",");
  // console.log(newestEatsHash);
  // console.log(newestBarsHash);
  // console.log(newestShopHash);
  // console.log(newestAttractionHash);
  // console.log(newestEventHash);

  // Step 9: Using the array of eats, loop over the array to look for the eats checkbox that matches that value, then cb.checked=true
  
  // for (const cb of eatsCheckboxes) {
  //   if (newestEatsHash.includes(cb.value)) {
  //     cb.checked=true;
  //   }
  // }
  
  // // Step 7: Repeat for Bars

  // for (const cb of barCheckboxes) {
  //   if (newestBarsHash.includes(cb.value)) {
  //     cb.checked=true;
  //   }
  // }

  // // Step 8: Repeat for Shops 

  // for (const cb of shoppingCheckboxes) {
  //   if (newestShopHash.includes(cb.value)) {
  //     cb.checked=true;
  //   }
  // }

  // // Step 9: Repeat for Attractions 

  // for (const cb of attractionCheckboxes) {
  //   if (newestAttractionHash.includes(cb.value)) {
  //     cb.checked=true;
  //   }
  // }

  // // Step 10: Repeat for Events 

  // for (const cb of eventCheckboxes) {
  //   if (newestEventHash.includes(cb.value)) {
  //     cb.checked=true;
  //     }
  // }

  // // // Step 11: Finally, filter the data using a pre-existing function
  //  filterEats();

  // Create Eats Checkbox Filter

  for (const eatsID of eatsCheckboxes) {
    eatsID.addEventListener(
      "change", () => {
        filterEats();
      }
    )
  }

  // Create Bar Checkbox Filter 

  for (const barID of barCheckboxes) {
    barID.addEventListener(
      "change", () => {
        filterBar();
      }
    )
  }

  // Create Shopping Checkbox Filter 

  for (const shoppingID of shoppingCheckboxes) {
    shoppingID.addEventListener(
      "change", () => {
        filterShopping();
      }
    )
  }

  // Create Attraction Checkbox Filter 

  for (const attractionID of attractionCheckboxes) {
    attractionID.addEventListener(
      "change", () => {
        filterAttraction();
      }
    )
  }

  // Create Event Checkbox Filter

  for (const eventID of eventCheckboxes) {
    eventID.addEventListener(
      "change", () => {
        filterEvent();
      }
    )
  }

  // Setup Filters to Understand Eats, Bars, Attractions, & Events

  function shouldShowEats(restaurant) {
    let inSelectedEats = false;
    let inSelectedBar = false;
    let inSelectedShopping = false;
    let inSelectedAttraction = false;
    let inSelectedEvent = false;

    // Eats
    const checkedEatsCBs = [];
    for (const cb of eatsCheckboxes) {
      if (cb.checked) {
        checkedEatsCBs.push(cb);
      }
    }

    if (checkedEatsCBs.length > 0) {
      for (const cb of checkedEatsCBs) {
        if (restaurant.properties.Type == cb.value) {
          inSelectedEats = true;
          break;

        }
      }
    } else {
      inSelectedEats = true;
    }

    // Bars 

    const checkedBarsCBs = [];
    for (const cb of barCheckboxes) {
      if (cb.checked) {
        checkedBarsCBs.push(cb);
      }
    }

    if (checkedBarsCBs.length > 0) {
      for (const cb of checkedBarsCBs) {
        if (restaurant.properties.Type == cb.value) {
          inSelectedBar = true;

        }
      }
    } else {
      inSelectedBar = true;
    }

    // Shopping 

    const shoppingCBs = [];
    for (const cb of shoppingCheckboxes) {
      if (cb.checked) {
        shoppingCBs.push(cb);
      }
    }

    if (shoppingCBs.length > 0) {
      for (const cb of shoppingCBs) {
        if (restaurant.properties.Type == cb.value) {
          inSelectedShopping = true;

        }
      }
    } else {
      inSelectedShopping = true;
    }

    return inSelectedEats && inSelectedBar && inSelectedShopping && inSelectedAttraction && inSelectedEvent
  }

  // Setup Individual Filters for Eats, Bars, Shopping, Attractions, & Events -- PICKUP HERE !!!!!

  //Eats Checkbox Filter

  function filterEats() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowEats(eatsPlace)) {
        filteredData.push(eatsPlace);
      }

    }
    const newEvent3 = new CustomEvent("filtered",
      {
        detail: filteredData
      })
    eventBus.dispatchEvent(newEvent3)
    makeNewURL();
  }

  // Update URL 

  function makeNewURL() {

    const eatsURL = [];
    for (const cb of eatsCheckboxes) {
      if (cb.checked) {
        eatsURL.push(cb.value);
      }
    }

    const barsURL = [];
    for (const cb of barCheckboxes) {
      if (cb.checked) {
        barsURL.push(cb.value);
      }
    }

    const shopURL = [];
    for (const cb of shoppingCheckboxes) {
      if (cb.checked) {
        shopURL.push(cb.value);
      }
    }

    const attractionURL = [];
    for (const cb of attractionCheckboxes) {
      if (cb.checked) {
        attractionURL.push(cb.value);
      }
    }

    const eventURL = [];
    for (const cb of eventCheckboxes) {
      if (cb.checked) {
        eventURL.push(cb.value);
      }
    }

    const eats_param = (eatsURL.join(','));
    const bars_param = (barsURL.join(','));
    const shop_param = (shopURL.join(','));
    const attraction_param = (attractionURL.join(','));
    const event_param = (eventURL.join(','));

    const hash = `Eats=${eats_param}&bars=${bars_param}&Shopping=${shop_param}&Attraction=${attraction_param}&Event=${event_param}`;
    window.location.hash = hash;

  }

  // Bars Checkbox Filter

  function filterBar() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowEats(eatsPlace)) {
        filteredData.push(eatsPlace);

      }
      const newEvent4 = new CustomEvent("filtered",
        {
          detail: filteredData
        })
      eventBus.dispatchEvent(newEvent4)
      makeNewURL();
    }
  }

  // Shops Checkbox Filter 

  function filterShops() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowEats(eatsPlace)) {
        filteredData.push(eatsPlace);

      }
      const newEvent5 = new CustomEvent("filtered",
        {
          detail: filteredData
        })
      eventBus.dispatchEvent(newEvent5)
    }
  }

    // Attraction Checkbox Filter 

    function filterAttraction() {
      const filteredData = []
      for (const eatsPlace of eats.features) {
        if (shouldShowEats(eatsPlace)) {
          filteredData.push(eatsPlace);
  
        }
        const newEvent6 = new CustomEvent("filtered",
          {
            detail: filteredData
          })
        eventBus.dispatchEvent(newEvent6)
      }
    }

      // Event Checkbox Filter 

  function filterEvent() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowEats(eatsPlace)) {
        filteredData.push(eatsPlace);

      }
      const newEvent7 = new CustomEvent("filtered",
        {
          detail: filteredData
        })
      eventBus.dispatchEvent(newEvent7)
    }
  }

}

export {
  initializeFilters
}