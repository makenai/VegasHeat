$(document).ready(function() {
  
  // Dirty Dirty Code
	
	var geocoder = new google.maps.Geocoder();

	var map = new google.maps.Map( document.getElementById("mapView"), {
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	// Center on our center
  geocoder.geocode({ 'address': DATA.center[1] + ',' + DATA.center[2] }, function(results,status) {
    var location = results[0].geometry.location;
    map.setCenter( location );
	});
	
	// Generate Track Links
	var trackLinks = '<ul>';
  for ( track in DATA.tracks ) {
    if ( DATA.tracks.hasOwnProperty( track ) ) {
      trackLinks += '<li><a href="#' + track + '">' + track + ' (' +  DATA.tracks[ track ].length +')</a></li>';
    }
  }
  trackLinks += '</ul>';
  $('#tracks').html( trackLinks );
  
  // Click on a track handler
  var markers = [];
  
  function clearMarkers() {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers = [];
  }
  
  $('#tracks a').click(function(e) {
    e.preventDefault();
    clearMarkers();
    var track = $(e.target).attr('href').slice(1);
    var addresses = DATA.tracks[ track ];
    $(addresses).each(function(i,a) {
      geocoder.geocode({ 'address': a[1] + ',' + a[2] }, function(results,status) {
        var location = results[0].geometry.location;
        var marker = new google.maps.Marker({
          title: a[0],
          position: location,
          map: map
        });
        markers.push( marker );
      });
      
    });

  });
		
});