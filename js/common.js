function initMap() {
  map = new L.Map('map', {
    //center: bounds.getCenter(),
    center: new L.LatLng(42, -87),
    zoom: 6,
    maxZoom:8,
    minZoom: 6,
    zoomControl:false,
    layers: [metroLabelsGroup, metrosGroup, riverGroup, overlayTiles, activeTiles],
    maxBounds: bounds


    

  });

  //map.panInsideBounds(bounds);

  //var satellite = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png');

  // Attach event handlers to objects in the control bar
  $('#zoomIn').on('click', function() {
    map.zoomIn();
  });
  $('#zoomOut').on('click', function() {
    map.zoomOut();
  });
  $(window).on("resize", function() {
    resize();
  });

  $('#collapse').on('click', function() { 
    if ($('#collapseMenu').is(':hidden')) {
      $('#collapseMenu').slideDown();
    } else {
      $('#collapseMenu').slideUp();
    }
  });

  $('#legendButton').on('click', function() {
    if ($('.info.legend').is(':hidden')) {
      $('.info.legend').show();
      $('#legendButton').html('<i class="icon-key icon-large"></i> Hide Legend');
    } else {
      $('.info.legend').hide();
      $('#legendButton').html('<i class="icon-key icon-large"></i> Show Legend');
    }
  });

  $('.nav-list a').on('click', function() {
    $('#collapseMenu').slideUp();
  });

  //$('.layerOptions').change(function(e) {
    //if (map.hasLayer(mapbox) == true) {
      //map.addLayer(satellite);
      //map.removeLayer(mapbox);
    //} else {
      //map.addLayer(mapbox);
      //map.removeLayer(satellite)
    //}
  //});
}

// Make everything fit the viewport
$('#map').css('width', $('body').width());

// Function to make sure the map and interface fit the device viewport
function resize () {
  if ($('body').width() < 550) {
    $('#map').css('width', $('body').width());
    $('.info.legend').css('display', 'none');
  } else {
    $('#map').css('width', $('body').width());
    $('.info.legend').css('display', 'block');
    $('#collapseMenu').hide();
  }
}
