let map;
let hotels = [];
let hotelMarker;
let venueMarker;
let psaMarker;
let directionsService;
let hotelToPSARenderer;
let psaToVenueRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();

    fetch('https://sheets.googleapis.com/v4/spreadsheets/1fktkp6Osgs08qbYgKorEaZZxdDLq-0LRN3BMw7j_4kQ/values/Hotels!B2:C51?key=AIzaSyBjlGkxN5JMqjBQn0Tb0HY-3hG8ACkITuM')
        .then(response => response.json())
        .then(data => {
            hotels = data.values.map(row => ({
                name: row[0],
                address: row[1]
            }));
            console.log('Hotels:', hotels);

            populateHotelDropdown();
        })
        .catch(error => {
            console.error('Error fetching hotel data:', error);
        });
}

function populateHotelDropdown() {
    const hotelSelect = document.getElementById('hotel-select');

    hotels.forEach(hotel => {
        const option = document.createElement('option');
        option.value = hotel.address;
        option.textContent = hotel.name;
        hotelSelect.appendChild(option);
    });

    hotelSelect.addEventListener('change', showHotelMarker);
}

function showHotelMarker() {
    const selectedHotel = document.getElementById('hotel-select').value;
    const hotelName = document.getElementById('hotel-select').options[document.getElementById('hotel-select').selectedIndex].text;
    if (selectedHotel) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: selectedHotel }, function(results, status) {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                if (hotelMarker) {
                    hotelMarker.setMap(null);
                }
                hotelMarker = new google.maps.Marker({
                    map: map,
                    position: location,
                    title: hotelName
                });
                map.setCenter(location);
                map.setZoom(14);
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    }
}
