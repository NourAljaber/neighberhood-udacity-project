var locations = [{
    title: 'Kingdom Center',
    location: {
      lat: 24.711534,
      lng: 46.674345
    },
    description: ''
  },
  {
    title: 'Abraj Al Bait',
    location: {
      lat: 21.418751,
      lng: 39.825556
    },
    description: ''
  },
  {
    title: 'Tahliha Street',
    location: {
      lat: 21.546254,
      lng: 39.130543
    },
    description: ''
  },
  {
    title: 'Quba Mosque',
    location: {
      lat: 24.439247,
      lng: 39.617289
    },
    description: ''
  },
  {
    title: 'Madain Saleh',
    location: {
      lat: 26.804012,
      lng: 37.957270
    },
    description: ''
  }

];


var getLocationInfo = function(obj) {
  var wikipedia = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + obj.title + '&format=json&callback=wikiCallback';
     var wikiRequestTimeout = setTimeout(function() {
        alert('there is an errorr with the wikipedia API');
}, 8000);
  
  $.ajax({
    url: wikipedia,
    dataType: 'jsonp',
    success: function(response) {
      clearTimeout(wikiRequestTimeout);
      
      var titleList = response[1];
      for (var i = 0; i < titleList.length; i++) {
        titleLink = titleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + titleLink;
        obj.description = url;
      }
              
    }

  });
};

function loadInfo() {
  for (var j = 0; j < locations.length; j++) {
    getLocationInfo(locations[j]);
  }
}
loadInfo();


//view model//

var ViewModel = function() {
  var self = this;
  self.locations = ko.observableArray(locations);
  self.currentFilter = ko.observable('');

  self.displayedLocation = ko.computed(function() {
    var currentFilter = self.currentFilter().toLowerCase();

    var matchedLocs = [];
      matchedLocs = ko.utils.arrayFilter(self.locations(), function(loc) {
        var match = loc.title.toLowerCase().indexOf(currentFilter) != -1; // true or false
        
        if (loc.marker) 
          loc.marker.setVisible(match);
          return match;
        });

    return matchedLocs;
  }, this);
};

function googleError(){
     alert( "OPS! google maps API could not be loaded" );
}

// map and marker //

var map;
var markers = [];
var Infowindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 23.885942,
      lng: 45.079162
    },
    zoom: 13
  });

  var bounds = new google.maps.LatLngBounds();
  Infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var lat = locations[i].location.lat;
    var lng = locations[i].location.lng;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      lat: lat,
      lng: lng,
      draggable: true,
      animation: google.maps.Animation.DROP,
      id: i
    });

    viewModel.locations()[i].marker = marker;
    markers.push(marker);
    
    addMarkerEvent(marker);

    bounds.extend(markers[i].position);
  }

  map.fitBounds(bounds);
}



function addMarkerEvent(marker){
   marker.addListener('click', function() {
      populateInfoWindow(marker, Infowindow);
    });
}


function populateInfoWindow(marker, infowindow) {
  var description;
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    for (var x = 0; x < locations.length; x++) {
      if (locations[x].title == marker.title) {
        description = locations[x].description;
        marker.setAnimation(google.maps.Animation.BOUNCE); // marker once click
       
      }

    }
     setTimeout(function() {
          marker.setAnimation(null);
        }, 750); // time to stop marker anmation after the click
  }
  infowindow.setContent('<div>' + marker.title + '</div>' + '<div>( ' + marker.lat + '   ,   ' + marker.lng + ' )</div> <div> <a href =" ' + description + '" > click here for more </div>');
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
    infowindow.setMarker = null;
  });
}


function placelink(title) {
  $(document).ready(function() {
    //open infowindo for the tiltle selected
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].title == title) {
        populateInfoWindow(markers[i], Infowindow);
      }
    }
  });
}


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}


var viewModel = new ViewModel();

ko.applyBindings(viewModel);