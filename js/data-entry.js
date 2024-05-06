import { placeCollection, storage } from './firebase.js';
import { ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
import {addDoc} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

// User Clicks and Pop up Form Appears

function showNewPlaceForm(map,lat,lng){

    // Create a marker at the clicked coordinates
    var marker = L.marker([lat, lng]).addTo(map);

    // Create a form for user input
    var popupContent = "<strong>Add a Place</strong><br><br>";
    popupContent += "<form id='addPlaceForm'>";
    popupContent += "<div class='icon-container'>";
    popupContent += "<div class='category-options'>";
    popupContent += "Category: ";
    popupContent += "<input type='radio' class='category-option' name='category' id='Eat-Button' value='Eat'>";
    popupContent += "<label for='Eat-Button'><img class='category-option' src='images/eat.png' alt='Eat' data-value='Eat'></label>";
    popupContent += "<input type='radio' class='category-option' name='category' id='Drink-Button' value='Drink'>";
    popupContent += "<img class='category-option' src='images/drink.png' alt='Drink' data-value='Drink'>";
    popupContent += "<input type='radio' class='category-option' name='category' id='Culture-Button' value='Culture'>";
    popupContent += "<img class='category-option' src='images/culture.png' alt='Culture' data-value='Culture'>";
    popupContent += "<input type='radio' class='category-option' name='category' id='Shop-Button' value='Shop'>";
    popupContent += "<img class='category-option' src='images/shop.png' alt='Shop' data-value='Shop'>";
    popupContent += "</div>";
    popupContent += "Name: <input type='text' id='placeName'><br>";
    popupContent += "Details: <textarea id='placeDetails'></textarea><br>";
    popupContent += "Photos: <input type='file' id='placePhotos'><br>";
    popupContent += "<input type='submit' value='Add Place'>";
    popupContent += "</form>";

    // Bind the popup content to the marker
    marker.bindPopup(popupContent).openPopup();

    // Function to handle icon click
    function handleIconClick() {

        // Remove active class from all icons
        document.querySelectorAll('.category-option').forEach(function(icon) {
            icon.classList.remove('active');
        });

        // Add active class to the clicked icon
        this.classList.add('active');
    }

    // Add event listeners to the icons
    document.querySelectorAll('.category-option').forEach(function(icon) {
        icon.addEventListener('click', handleIconClick);
    });
    
    // Their click prompts a pop-up form
    marker.bindPopup(popupContent).openPopup();


    // Add an event handler for when the form is submitted
    const addPlaceForm = document.getElementById('addPlaceForm');
    addPlaceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        savePlaceFormData(map, marker.getLatLng());
    });
window.showNewPlaceForm=showNewPlaceForm;

    // Add an event handler for when the popup is closed
    marker.on('popupclose', function() {
        // Remove the marker if the popup is closed without submitting the form
        map.removeLayer(marker);
    });
}

// User Submits Form & Saves Form Data 

async function placeAdder(placeLatLng,placeType,placeLabel,placeDetails,placePhotos) {
    const photoURL = [];
    for (const photo of placePhotos) {
        const photoRef = ref(storage, "/public/"+photo.name);
        const response = await uploadBytes(photoRef, photo);
        photoURL.push("https://storage.googleapis.com/"+response.metadata.bucket+ "/" +response.metadata.fullPath)
        console.log(response);
    }
        const addPlace = {
            type: 'Feature',
            geometry: placeLatLng ? {
                type: 'Point',
                coordinates: [placeLatLng.lng, placeLatLng.lat],
            } : null,
            properties: {
                category: placeType,
                name: placeLabel,
                details: placeDetails,
                photos: photoURL
            }
        };
        return addPlace;
}

// Function to handle form submission
async function savePlaceFormData(map, latlng) {

    // Retrieve form data
    var placeType = document.querySelector('.category-option:checked').value;
    var placeName = document.getElementById('placeName').value;
    var placeDetails = document.getElementById('placeDetails').value;
    var placePhotos = document.getElementById('placePhotos').files;

    // Call placeAdder function to process form data
    var addPlace = await placeAdder(latlng, placeType, placeName, placeDetails, placePhotos);
    console.log("New place added:", addPlace);

    // Add the marker to the map
    const placeMarker = L.marker(latlng).addTo(map);
    console.log(placeMarker);

    // Add document into the Places_Collection
    const docRef = await addDoc(placeCollection, {
        Name: addPlace.properties.name,
        Type: addPlace.properties.category,
        Where: addPlace.geometry.coordinates,
        Description: addPlace.properties.details,
        Photos: addPlace.properties.photos,
    });
    console.log("Document written with ID: ", docRef.id);

    // Close the popup
    map.closePopup();
    map.places.push(addPlace);
};

// User Opens Map and Sees Data 

function recallSavedData(){

};

export {
    showNewPlaceForm
};