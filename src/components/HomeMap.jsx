import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';
import React, {useState, useEffect} from 'react'
import '../components/HomeMap.css';

export default function HomeMap(){

    //for infoWindow selection
    const [selectedLocation, setSelectedLocation] = useState(null);

    //arrays for markers
    const [photos, setPhotos] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5555/photos")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            setPhotos(data.data)
        })
        .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        fetch("http://localhost:5555/locations")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            setLocations(data.data)
        })
        .catch((err) => console.log(err))
    }, [])




    //current position and first data
    const defaultCenter = navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position.coords.latitude, position.coords.longitude)
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        return pos;
    })

    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);

    useEffect(() => {
        // Get the user's current position using the Geolocation API
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setCurrentPosition(pos);
            },
            () => {
            console.error("Geolocation failed or permission denied.");
            // Optionally set center to a default location if user denies permission
            setCurrentPosition(defaultCenter); 
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } // Options for better accuracy
        );
        } else {
        // Browser doesn't support Geolocation
        console.error("Browser doesn't support Geolocation.");
        setCurrentPosition(defaultCenter);
        }
    }, []); // Run only once when the component mounts

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    return (
        <div className='map-container'>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
            style={{width: '100vw', height: '92vh'}}
            defaultCenter={currentPosition}
            defaultZoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
            gestureHandling='greedy'
            disableDefaultUI
            
            />

            <Marker position={currentPosition} />

            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={{
                    lat: Number(location.lat),
                    lng: Number(location.lng)
                    }}
                    onClick={() => {setSelectedLocation(location)}}
                />
                ))}

                {selectedLocation && (
                    <InfoWindow
                        position={{
                        lat: Number(selectedLocation.lat),
                        lng: Number(selectedLocation.lng)
                        }}
                        onCloseClick={() => setSelectedLocation(null)}
                    >
                        <div className="info-window">
                            <div id="carouselExampleIndicators" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                    <img src="" class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                    <img src="..." class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                    <img src="..." class="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>

                            <h5>{selectedLocation.name}</h5>
                            <p>{selectedLocation.address}</p>
                            <p><strong>Lat:</strong> {selectedLocation.lat}</p>
                            <p><strong>Lng:</strong> {selectedLocation.lng}</p>
                        </div>
                    </InfoWindow>
                )}

        </APIProvider>
        </div>
    );
}
