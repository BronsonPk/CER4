function displaySecurityPerimeter(map) {
  map.data.addGeoJson(securityPerimeterGeoJson);
  map.data.setStyle({
    fillColor: 'red',
    fillOpacity: 0.2,
    strokeColor: 'red',
    strokeWeight: 2
  });
}
