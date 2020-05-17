const createListHtml = (list) => {
  return list.map(e => `<li class="list-group-item">${e}</li>`).join("");
}

const loadContainmentZones = () => {
  const url = "https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones";
  const key = "YOUR KEY";

  let lat, lng;

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function success(pos) {
    let crd = pos.coords;
    lat = crd.latitude;
    lng = crd.longitude;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "key": key,
        "lng": lng,
        "lat": lat,
        "radius": 5000
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(res => {
      console.log(res);
      document.getElementById("list").innerHTML = createListHtml(res.containmentZoneNames);
    }).catch(err => {
      console.error(err);
      alert('Some Error. Refresh the page');
    })

  }

  navigator.geolocation.getCurrentPosition(success, error);
}