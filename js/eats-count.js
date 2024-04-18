function initializeeatsDisplay(Restaurants, eventBus) {
  const eatsCountDisplay = document.querySelector('#eats-count');

  updateCountDisplay(Restaurants, eatsCountDisplay);
  setupCountDisplayEventHandlers(eatsCountDisplay, eventBus);

  return eatsCountDisplay;
}

function setupCountDisplayEventHandlers(display, eventBus) {
  eventBus.addEventListener('filterschanged', (evt) => {
    const { include } = evt.detail;
    updateCountDisplay(include, display);
  });
}

function updateCountDisplay(Restaurants, display) {
  display.innerHTML = `Showing ${Restaurants.length} Name${Restaurants.length === 1 ? '' : 's'}`;
}

export {
  initializeeatsDisplay,
};
