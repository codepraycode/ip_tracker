function initializeMap(map) {
    let tileUrl = "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=59d406a901be457998ca0ee971be90fe";
    L.tileLayer(
        tileUrl, {
            maxZoom: 10,
            attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="#">codepraycode</a>. © OpenStreetMap'
        }
    ).addTo(map);

    // renderMap(map);

    fetch("https://ipapi.co/json/")
        .then((res) => {
            return res.json()
        })
        .then(data => {
            // console.log(data);
            let { ip: ipaddress } = data;
            locateOnMap(map, ipaddress);

        })
        .catch(err => {
            // console.error(err);
            // showError(err);
            showError("Netwrok Error!");
        })
}

function showError(msg) {
    // console.log(msg.toString());
    // msg = msg.toString();
    document.getElementById("error").innerText = msg //.split(":").slice(1, ).join(" ");
}


function renderMap(map, { info, coordinates }) {
    // let map = L.map('map').setView([51.505, -0.09], 13);
    cord = coordinates || [51.505, -0.09];

    info = info || `<b>Location</b>: Latitude ${cord[0]}, Longtitude ${cord[1]}`;

    map.setView(cord, 6);

    // setting custom icon
    let myicon = L.icon({
        iconUrl: '/static/images/icon-location.svg',
    })

    // Adding marker
    let marker = L.marker(cord, { icon: myicon }).addTo(map);

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
    marker.bindPopup(info) //.openPopup();
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


function locateOnMap(map, ip) {
    let api_key = "at_v198k7JVpjjziJwi48vxS9sma0S6r";
    let api_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip}`;

    fetch(api_url)
        .then((res) => {
            return res.json()
        })
        .then(data => {
            // console.log(data);

            let { location, ip, isp, } = data;

            if (!location) {
                showError(data.messages);
                return
            }


            let { city, country, region, lat, lng, timezone, postalCode } = location;

            // console.log(lat, lng);

            ip_display.innerText = ip;
            isp_display.innerText = isp;
            location_display.innerText = `${city}, ${country} ${postalCode}`;
            tz_display.innerText = `UTC ${timezone}`;


            renderMap(map, { coordinates: [lat, lng], info: `<b>${city}, ${region}</b> (Latitude: ${lat}, Longitude: ${lng})` });
        })
        .catch(err => {
            // console.error(err);
            // document.getElementById("error").innerText = err;
            showError(err);
        })
}

window.onload = () => {
    // entry element
    let ipaddress = document.getElementById("ipaddress");
    let btn = document.getElementById('btn');


    ipaddress.addEventListener('change', () => {
        showError("");
    })


    // Display elements
    let ip_display = document.getElementById("ip_display");
    let location_display = document.getElementById("location_display");
    let tz_display = document.getElementById("tz_display");

    let isp_display = document.getElementById("isp_display");

    let map = L.map('map');

    //.setView([51.505, -0.09], 13);

    initializeMap(map);

    // let ip = "192.212.174.101"; //"8.8.8.8";
    btn.addEventListener('click', () => {

            let ipaddress = document.getElementById("ipaddress").value;
            // console.log(ipaddress, ipaddress.value);

            locateOnMap(map, ipaddress);

        })
        // locateOnMap(map, ip)

}