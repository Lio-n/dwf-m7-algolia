import "dotenv/config";

const API_BASE_URL = process.env.API_BASE_URL;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

const initMap = () => {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
  });
};

const initSearchForm = (callback) => {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mapboxClient.geocodeForward(
      e.target.q.value,
      {
        autocomplete: true,
      },
      function (err, data, res) {
        console.log(data);
        if (!err) callback(data.features);
      }
    );
  });
};

const getShopsNearby = async (lng, lat) => {
  // # Fetch
  const arr = await (await fetch(`${API_BASE_URL}/shops-nearby?lat=${lat}&lng=${lng}`)).json();

  if (arr) {
    for (const shop of arr) {
      const { lat, lng } = shop._geoloc;
      // * Add Marker
      const marker = new mapboxgl.Marker().setLngLat({ lng, lat }).addTo(map);
    }
  }
};

(() => {
  window.map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];
    const coordinates = firstResult.geometry.coordinates;
    const lat = coordinates[1],
      lng = coordinates[0];

    getShopsNearby(lng, lat);

    // * Add Marker
    const marker = new mapboxgl.Marker().setLngLat({ lng, lat }).addTo(map);

    // * Center The Marker
    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
})();
