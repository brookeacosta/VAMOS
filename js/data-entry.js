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
    popupContent += "<input type='radio' name='category' id='Eat-Button'>";
    popupContent += "<label for='Eat-Button'><img class='category-option' src='images/eat.png' alt='Eat' data-value='Eat'></label>";
    popupContent += "<img class='category-option' src='images/drink.png' alt='Drink' data-value='Drink'>";
    popupContent += "<img class='category-option' src='images/culture.png' alt='Culture' data-value='Culture'>";
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

function placeAdder(placeLatLng,placeType,placeLabel,placeDetails,placePhotos) {
    for (const photo of placePhotos.files) {
        photoRef = ref(storage, photo.name);
        uploadBytes(photoRef, photo);
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
                photos: placePhotos
            }
        };
        return addPlace;
}

// Function to handle form submission
async function savePlaceFormData(map, latlng) {

    // Retrieve form data
    var placeType = document.querySelector('.category-option.active').getAttribute('data-value');
    var placeName = document.getElementById('placeName').value;
    var placeDetails = document.getElementById('placeDetails').value;
    var placePhotos = document.getElementById('placePhotos').value;

    // Call placeAdder function to process form data
    var addPlace = placeAdder(latlng, placeType, placeName, placeDetails, placePhotos);
    console.log("New place added:", addPlace);

    // Add the marker to the map
    placeMarker = L.marker(latlng).addTo(map);

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
};

// User Opens Map and Sees Data 

function recallSavedData(){

};

export {
    showNewPlaceForm
};

//     // Handle form submission
//     L.DomEvent.on(document.getElementById('addPlaceForm'), 'submit', function(e) {
//         L.DomEvent.stop(e); // Prevent default form submission


//         });
//     });

// // function rememberPlaceAdded (map){
// //     const placeData = placeAdder();
// //     window.localStorage.setItem('placeFormData', JSON.stringify(placeData));
// // }

//     function rememberPlaceAdded() {
//         const place = getPlaceFormData();
//         window.localStorage.setItem('placeFormData', JSON.stringify(placeData));

//     }

//     function recallPlaceAdded() {
//         const place = JSON. parse (window. localStorage.getItem('placeFormData™'));
//         if (place) {
//         placeTypeSelect.value = place.properties.category;
//         placeDetailText.value = place.properties.details;
//         placePhoto.value = place.properties.photos;
//         placeLayer.eachLayer ((layer) => {
//         if (layer.feature.properties.OBJECTID == placeData.properties.id) {
//         setReportSelectedLaver (laver):
//         }
//     });
//     setPlaceMarker(L.latlng([
//         placeData.geometry[1],
//         placeData.geometry[0],
//     ]));
//     }
//     };