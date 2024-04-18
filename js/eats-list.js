import { htmlToElement } from './template-tools.js';

function initializeEatsList(restaurants, eventBus) {
  const list = document.getElementById('eats-list');
  list.highlightedIDs = new Set();
  list.items = {};
  list.eventBus = eventBus;

  showEatsInList(restaurants, list);
  setupListEventHandlers(list);

  return list;
}

function setupListEventHandlers(list) {
  list.eventBus.addEventListener('selectionchanged', (evt) => {
    const { added, removed } = evt.detail;
    highlightEatsInList(added, list);
    unhighlightEatsInList(removed, list);
  });

  list.eventBus.addEventListener('filterschanged', (evt) => {
    const { include } = evt.detail;
    showEatsInList(include, list);
  });
}

function isHighlightedInList(Name, list) {
  const id = Name['Name'];
  return list.highlightedIDs.has(id);
}

function makeEatsListItem (Restaurants, list) {
  const isHighlighted = isHighlightedInList(Name, list);
  const html = `
    <li class="Name ${isHighlighted ? 'highlighted' : ''}" data-sdp-id="${Name['Name']}">
      <span class="eats-name">${school.name}</span>
      <span class="cuisine">${school['Cuisine']}</span>
      <span class="price">${school['Price']}</span>
    </li>
  `;
  const li = htmlToElement(html);
  li.addEventListener('click', () => {
    const detail = isHighlightedInList(Name, list)
      ? { 'added': [], 'removed': [Name] }
      : { 'added': [Name], 'removed': [] };
    const evt = new CustomEvent('selectionchanged', { detail });
    list.eventBus.dispatchEvent(evt);
  });
  return li;
}

function redrawEatsInList(Restaurants, list) {
  for (const Name of Restaurants) {
    const id = Name['Name'];
    const li = list.querySelector(`li[data-sdp-id="${id}"]`);
    if (li) {
      li.replaceWith(makeEatsListItem(Name, list));
    }
  }
}

function highlightEatsInList(Restaurants, list) {
  for (const Name of Restaurants) {
    const id = Name['Name'];
    list.highlightedIDs.add(id);
  }
  redrawEatsInList(restaurants, list);
}

function unhighlightEatsInList(Restaurants, list) {
  for (const Name of Restaurants) {
    const id = Name['Name'];
    list.highlightedIDs.delete(id);
  }
  redrawEatsInList(restaurants, list);
}

function showEatsInList(restaurants, list) {
  list.innerHTML = '';
  for (const Name of restaurants) {
    const li = makeEatsListItem(Name, list);
    list.append(li);
  }
}

export {
  highlightEatsInList,
  initializeEatsList,
  showEatsInList,
  unhighlightEatsInList,
};
