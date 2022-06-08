window.onload = () => {

    let map = L.map('map').setView([51.505, -0.09], 13);

    let tileUrl = "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=59d406a901be457998ca0ee971be90fe";

    L.tileLayer(
        tileUrl, {
            maxZoom: 10,
            attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="#">codepraycode</a>. © OpenStreetMap'
        }
    ).addTo(map);

    // setting custom icon
    let myicon = L.icon({
        iconUrl: '/static/images/icon-location.svg',
    })

    // Adding marker
    let marker = L.marker([51.5, -0.09], { icon: myicon }).addTo(map);

    // // Adding circle
    // let circle = L.circle([51.508, -0.11], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(map)

    // // adding polygon
    // let polygon = L.polygon([
    //     [51.509, -0.08],
    //     [51.503, -0.06],
    //     [51.51, -0.047]
    // ]).addTo(map);


    // adding popup
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.") //.openPopup();
        // circle.bindPopup("I am a circle.");
        // polygon.bindPopup("I am a polygon.")



    // Using popup as layers
    let popup = L.popup()
        // .setLatLng([51.513, -0.09])
        // .setContent("I'm a standalone popup")
        // .openOn(map);

    // using events
    function handleMapClick(event) {
        // console.log(event);
        // alert("You clicked the map at " + event.latlng);
        // show the latitude and longtitude of the click portion
        popup
            .setLatLng(event.latlng)
            .setContent("You clicked the map at " + event.latlng.toString())
            .openOn(map);
    }

    map.on('click', handleMapClick);
}