let mapboxgl;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpZmEzMyIsImEiOiJjbTFjMDJzMmoyNWRvMnZzOGZzcXo3cHQ1In0.CLdUXxSpEVQV7OR2dhz6qw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.4194, 37.7749], 
    zoom: 13
});

map.addControl(new mapboxgl.NavigationControl());

let markerStart, markerEnd;
let travelMode = 'cycling'; 

function fetchDirections(start, end, travelMode) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${start};${end}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.routes.length > 0) {
                const route = data.routes[0].geometry.coordinates;
                const distance = (data.routes[0].distance / 1000).toFixed(2);
                const duration = (data.routes[0].duration / 60).toFixed(2);
                
                document.getElementById('distance').innerText = `Distance: ${distance} km`;
                document.getElementById('duration').innerText = `Duration: ${duration} mins`;

                if (map.getSource('route')) {
                    map.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        }
                    });
                } else {
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: route
                                }
                            }
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3b9ddd',
                            'line-width': 5
                        }
                    });
                }

                if (markerStart) markerStart.remove();
                if (markerEnd) markerEnd.remove();

                markerStart = new mapboxgl.Marker({ color: 'green' })
                    .setLngLat(start.split(',').map(Number))
                    .setPopup(new mapboxgl.Popup().setText('Start'))
                    .addTo(map);

                markerEnd = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(end.split(',').map(Number))
                    .setPopup(new mapboxgl.Popup().setText('End'))
                    .addTo(map);
                const bounds = new mapboxgl.LngLatBounds();
                route.forEach(coord => bounds.extend(coord));
                map.fitBounds(bounds, { padding: 20 });
            } else {
                alert('No route found. Please try again.');
            }
        })
        .catch(error => console.error('Error fetching directions:', error));
}


function handleSearch() {
    const locationInput1 = document.getElementById('location-input1').value;
    const locationInput2 = document.getElementById('location-input2').value;

    const geocodeUrl1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput1)}.json?access_token=${mapboxgl.accessToken}`;
    const geocodeUrl2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput2)}.json?access_token=${mapboxgl.accessToken}`;

    if (locationInput2) {
        Promise.all([fetch(geocodeUrl1), fetch(geocodeUrl2)])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                if (data[0].features.length > 0 && data[1].features.length > 0) {
                    const start = data[0].features[0].geometry.coordinates.join(',');
                    const end = data[1].features[0].geometry.coordinates.join(',');

                    fetchDirections(start, end, travelMode); // Pass the selected travel mode
                } else {
                    alert('One or both locations not found. Please try again.');
                }
            })
            .catch(error => console.error('Error fetching location coordinates:', error));
    } else {
        fetch(geocodeUrl1)
            .then(response => response.json())
            .then(data => {
                if (data.features.length > 0) {
                    const coordinates = data.features[0].geometry.coordinates;
                    map.flyTo({ center: coordinates, zoom: 15 });

                    if (markerStart) markerStart.remove();
                    markerStart = new mapboxgl.Marker({ color: 'blue' })
                        .setLngLat(coordinates)
                        .setPopup(new mapboxgl.Popup().setText(locationInput1))
                        .addTo(map);

                    fetchNearbyPoints(coordinates);
                } else {
                    alert('Location not found. Please try again.');
                }
            })
            .catch(error => console.error('Error fetching location coordinates:', error));
    }
}


function fetchNearbyPoints(coordinates) {
    const nearbyCategories = ['restaurant', 'school', 'park'];
    
    nearbyCategories.forEach(category => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?proximity=${coordinates.join(',')}&access_token=${mapboxgl.accessToken}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.features.length > 0) {
                    data.features.forEach(feature => {
                        let markerColor;

                        // Assign different colors for each category
                        if (category === 'restaurant') {
                            markerColor = 'red';  // Color for restaurants
                        } else if (category === 'school') {
                            markerColor = 'blue'; // Color for schools
                        } else if (category === 'park') {
                            markerColor = 'green'; // Color for parks
                        }

                        // Add marker with assigned color
                        new mapboxgl.Marker({ color: markerColor })
                            .setLngLat(feature.geometry.coordinates)
                            .setPopup(new mapboxgl.Popup().setText(`${feature.text} (${category})`))
                            .addTo(map);
                    });
                }
            })
            .catch(error => console.error(`Error fetching nearby ${category}:`, error));
    });
}


document.getElementById('get-cycling-info').addEventListener('click', () => {
    travelMode = 'cycling';
    handleSearch();  
});

document.getElementById('get-walking-info').addEventListener('click', () => {
    travelMode = 'walking';
    handleSearch();  
});

document.getElementById('get-bus-info').addEventListener('click', () => {
    travelMode = 'driving';
    handleSearch();
});


document.getElementById('search-button').addEventListener('click', handleSearch);

//
document.getElementById('find-restaurants').addEventListener('click', () => fetchNearbyPoints(['restaurant']));
document.getElementById('find-schools').addEventListener('click', () => fetchNearbyPoints(['school']));
document.getElementById('find-parks').addEventListener('click', () => fetchNearbyPoints(['park']));
















