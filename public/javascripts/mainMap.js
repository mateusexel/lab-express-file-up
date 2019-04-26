const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myLoc);
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
    // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }
}


function startMap(myLoc) {
  console.log('chamou');
  const ironhackBCN = {
    lat: -23.533773,
    lng: -46.625290,
  };

  const myHome = {
    lat: -23.5807498,
    lng: -46.6536064,

  };

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 13,
      center: ironhackBCN,
    },
  );
  const myMarker = new google.maps.Marker({
    position: myHome,
    map,
    title: 'Home',
  });
  const whereIam = new google.maps.Marker({
    position: myLoc,
    map,
    title: 'Where I`am',
  });

  const directionRequest = {
    origin: myLoc,
    destination: myHome,
    travelMode: 'DRIVING',
  };

  console.log(directionRequest);

  directionsService.route(
    directionRequest,
    (response, status) => {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);
  
      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    },
  );
}

getUserLocation();
